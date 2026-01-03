import { fetchFromCoinGecko } from "@/lib/coingecko.actions"
import DataTable from "@/components/DataTable"
import Image from "next/image"
import { cn, formatCurrency, formatPercentage } from "@/lib/utils"
import { TrendingDown, TrendingUp } from "lucide-react"

const Categories = async () => {
  const categories = await fetchFromCoinGecko<Category[]>("/coins/categories");
  const columns: DataTableColumn<Category>[] = [
    {
      header: "Category",
      cellClassName: "category-cell",
      cell: (category) => category.name,
    },
    {
      header: "Top Gainers",
      cellClassName: "top-gainers-cell",
      cell: (category) => category.top_3_coins.map(
        (coin) => <Image key={coin} src={coin} alt={coin} height={28} width={28} />
      ),
    },
    {
      header: "24h Change",
      cellClassName: "change-header-cell",
      cell: (category) => {
        const change24h = category.market_cap_change_24h;
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
      cell: (category) => formatCurrency(category.market_cap),
    },
    {
      header: "24h Volume",
      cellClassName: "volume-cell",
      cell: (category) => formatCurrency(category.volume_24h),
    },
  ];

  return (
    <div id="categories" className="custom-scrollbar">
      <h4>Top Categories</h4>

      <DataTable
        columns={columns}
        data={categories?.slice(0, 10)}
        rowKey={(_, index) => index}
        tableClassName="mt-3"
      />
    </div>
  )
}

export default Categories