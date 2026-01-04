import CoinsPagination from "@/components/CoinsPagination"
import DataTable from "@/components/DataTable"
import PoweredByCGAPI from "@/components/PoweredByCGAPI"
import { fetchFromCoinGecko } from "@/lib/coingecko.actions"
import { cn, formatCurrency, formatPercentage } from "@/lib/utils"
import { TrendingDown, TrendingUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const Coins = async ({ searchParams }: NextPageProps) => {
  const { page } = await searchParams;
  const currentPage =  Number(page) || 1;
  const perPage = 10;
  const allCoinsData = await fetchFromCoinGecko<CoinMarketData[]>("/coins/markets", {
    vs_currency: "usd",
    order: "market_cap_desc",
    per_page: perPage,
    page: currentPage,
    sparkline: false,
    price_change_percentage: "24h",
  });
  const columns: DataTableColumn<CoinMarketData>[] = [
    {
      header: "Rank",
      cellClassName: "rank-cell",
      cell: (coin) => (
        <>
          #{coin.market_cap_rank}
          <Link href={`/coins/${coin.id}`} aria-label="View coin" />
        </>
      ),
    },
    {
      header: "Token",
      cellClassName: "token-cell",
      cell: (coin) => (
          <div className="token-info">
            <Image src={coin.image} alt={coin.name} width={36} height={36} />
            <p>{coin.name} ({coin.symbol.toUpperCase()})</p>
          </div>
        ),
    },
    {
      header: "Price",
      cellClassName: "price-cell",
      cell: (coin) => formatCurrency(coin.current_price),
    },
    {
      header: "24h Change",
      cellClassName: "change-cell",
      cell: (coin) => {
        const change24h = coin.price_change_percentage_24h;
        const isPositive = change24h > 0;
        const percentageFormated = formatPercentage(change24h);

        return (
          <div className={cn("price-change flex items-center gap-2", isPositive ? "text-green-500" : "text-red-500")}>
            <div className="flex items-center">
              {isPositive ?
                <TrendingUp width={16} height={16} />
              :
                <TrendingDown width={16} height={16} />
              }
            </div>
            <p>{percentageFormated}</p>
          </div>
        )
      },
    },
    {
      header: "Market Cap",
      cellClassName: "market-cap-cell",
      cell: (coin) => formatCurrency(coin.market_cap),
    },
  ];

  const hasMorePages = allCoinsData.length === perPage;
  const estimatedTotalPages = currentPage >= 100 ?
    Math.ceil(currentPage / 100) * 100 + 100 : 100;

  return (
    <main id="coins-page" className="mt-12">
      <div className="content">
        <div className="flex items-start justify-between">
          <h4>All Tokens</h4>

          <PoweredByCGAPI svgClassName="mt-1 pr-2" size="lg" />
        </div>
        <DataTable
          columns={columns}
          data={allCoinsData}
          rowKey={(coin) => coin.id}
          tableClassName="coins-table"
        />

        <CoinsPagination
          currentPage={currentPage}
          totalPages={estimatedTotalPages}
          hasMorePages={hasMorePages}
        />
      </div>
    </main>
  )
}

export default Coins