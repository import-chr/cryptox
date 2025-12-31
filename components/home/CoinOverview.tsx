import { CoinOverviewFallback } from "@/components/home/fallback"
import { fetchFromCoinGecko } from "@/lib/coingecko.actions"
import { formatCurrency } from "@/lib/utils"
import Image from "next/image"

const CoinOverview = async () => {
  let coin: CoinDetailsData;

  try {
    coin = await fetchFromCoinGecko<CoinDetailsData>("/coins/bitcoin", {
        dex_pair_format: "symbol",
      });
  } catch (error) {
    if(process.env.NODE_ENV === "development") {
      console.error("Error fetching coin details:", error);
    }

    return <CoinOverviewFallback />;
  }

  return (
    <div id="coin-overview">
      <div className="header pt-2">
        <Image src={coin.image?.large ?? '/assets/icon.png'} alt={coin.name ?? 'Coin'} width={56} height={56} />
        
        <div className="info">
          <p>{coin.name} | {coin.symbol?.toUpperCase() ?? ''}</p>
          <h1>{formatCurrency(coin.market_data?.current_price?.usd)}</h1>
        </div>
      </div>
    </div>
  )
}

export default CoinOverview