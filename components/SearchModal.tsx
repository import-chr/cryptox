'use client'

import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { Search as SearchIcon } from "lucide-react"
import { useState } from "react"
import useSWR from "swr"
import { useDebounce, useKey } from "react-use"
import { searchCoins } from "@/lib/coingecko.actions"
import SearchItem from "@/components/SearchItem"

const TRENDING_LIMIT = 8;
const SEARCH_LIMIT = 10;

export const SearchModal = ({
  initialTrendingCoins = [],
}: {
  initialTrendingCoins?: TrendingCoin[];
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useDebounce(
    () => {
      setDebouncedQuery(searchQuery.trim());
    },
    300,
    [searchQuery]
  );

  const { data: searchResults = [], isValidating: isSearching } = useSWR<
    SearchCoin[]
  >(
    debouncedQuery ? ['coin-search', debouncedQuery] : null,
    ([, query]) => searchCoins(query as string),
    {
      revalidateOnFocus: false,
    }
  );

  useKey(
    (event) =>
      event.key?.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey),
    (event) => {
      event.preventDefault();
      setOpen((prev) => !prev);
    },
    {},
    [setOpen]
  );

  const handleSelect = (coinId: string) => {
    setOpen(false);
    setSearchQuery('');
    setDebouncedQuery('');
    router.push(`/coins/${coinId}`);
  };

  const hasQuery = debouncedQuery.length > 0;
  const trendingCoins = initialTrendingCoins.slice(0, TRENDING_LIMIT);
  const showTrending = !hasQuery && trendingCoins.length > 0;

  const isSearchEmpty = !isSearching && !hasQuery && !showTrending;
  const isTrendingListVisible = !isSearching && showTrending;

  const isNoResults = !isSearching && hasQuery && searchResults.length === 0;
  const isResultsVisible = !isSearching && hasQuery && searchResults.length > 0;

  return (
    <div id='search-modal'>
      <Button variant='ghost' onClick={() => setOpen(true)} className='trigger'>
        <SearchIcon size={18} />
        Search
        <kbd className='kbd'>
          <span className='text-xs'>⌘</span>K
        </kbd>
      </Button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        className='dialog'
        data-search-modal
      >
        <div className='cmd-input'>
          <CommandInput
            placeholder='Search for a token by name or symbol...'
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
        </div>

        <CommandList className='list custom-scrollbar'>
          {isSearching && <div className='empty'>Searching...</div>}

          {isSearchEmpty && (
            <div className='empty'>Type to search for coins...</div>
          )}

          {isTrendingListVisible && (
            <CommandGroup className='group'>
              {trendingCoins.map(({ item }) => (
                <SearchItem
                  key={item.id}
                  coin={item}
                  onSelect={handleSelect}
                  isActiveName={false}
                />
              ))}
            </CommandGroup>
          )}

          {isNoResults && <CommandEmpty>No coins found.</CommandEmpty>}

          {isResultsVisible && (
            <CommandGroup
              heading={<p className='heading'>Search Results</p>}
              className='group'
            >
              {searchResults.slice(0, SEARCH_LIMIT).map((coin) => (
                <SearchItem
                  key={coin.id}
                  coin={coin}
                  onSelect={handleSelect}
                  isActiveName
                />
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </div>
  );
};