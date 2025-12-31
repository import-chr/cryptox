import { cn, formatCurrency, formatPercentage } from "@/lib/utils"
import { fetchFromCoinGecko } from "@/lib/coingecko.actions"
import { TrendingCoinsFallback } from "@/components/home/fallback"
import { TrendingDown, TrendingUp } from "lucide-react"
import DataTable from "@/components/DataTable"
import Image from "next/image"
import Link from "next/link"

const TrendingCoins = async () => {
  let trendingCoins;

  try {
    trendingCoins = await fetchFromCoinGecko<{ coins: TrendingCoin[] }>("/search/trending",
      undefined,
      300
    );
  } catch (error) {
    console.error("Error fetching trending coins:", error);
    return <TrendingCoinsFallback />;
  }

  const columns: DataTableColumn<TrendingCoin>[] = [
    {
      header: "Name",
      cellClassName: "name-cell",
      cell: (coin) => {
        const item = coin.item;

        return (
          <Link href={`/coins/${item.id}`}>
            <Image src={item.large} alt={item.name} width={36} height={36} />
            <p>{item.name}</p>
          </Link>
        )
      },
    },
    {
      header: "24h Change",
      cellClassName: "name-cell",
      cell: (coin) => {
        const item = coin.item;
        const change24h = item.data.price_change_percentage_24h.usd;
        const isTrendingUp = change24h > 0;
        const percentageFormated = formatPercentage(change24h);

        return (
          <div className={cn("price-change", isTrendingUp ? "text-green-500" : "text-red-500")}>
            <p className="flex items-center">
              {isTrendingUp ?
                <TrendingUp width={16} height={16} />
              :
                <TrendingDown width={16} height={16} />
              }
            </p>
            <br />
            <p>{percentageFormated}</p>
          </div>
        )
      },
    },
    {
      header: "Price",
      cellClassName: "price-cell",
      cell: (coin) => formatCurrency(coin.item.data.price),
    },
  ];

  return (
    <div id="trending-coins">
      <h4>Trending Coins</h4>

        <DataTable 
          columns={columns}
          data={trendingCoins.coins.slice(0, 6)}
          rowKey={(coin) => coin.item.id}
          tableClassName="trending-coins-table"
          headerCellClassName="py-3!"
          bodyCellClassName="py-2!"
        />
    </div>
  )
}

export default TrendingCoins