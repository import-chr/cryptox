import { CoinOverviewFallback } from "@/components/home/fallback"
import { fetchFromCoinGecko } from "@/lib/coingecko.actions"
import { formatCurrency } from "@/lib/utils"
import Image from "next/image"
import CandlestickChart from "@/components/CandlestickChart"

const CoinOverview = async () => {
  try {
    const [ coin, coinOHLCData ] = await Promise.all([
      fetchFromCoinGecko<CoinDetailsData>("/coins/bitcoin", {
          dex_pair_format: "symbol",
        }),
  
      fetchFromCoinGecko<OHLCData[]>("/coins/bitcoin/ohlc", {
        vs_currency: "usd",
        days: 1,
        precision: "full",
      }),
    ]);

    return (
      <div id="coin-overview">
        <CandlestickChart data={coinOHLCData ?? []} coinId="bitcoin">
          <div className="header pt-2">
            <Image src={coin.image?.large ?? '/assets/icon.png'} alt={coin.name ?? 'Coin'} width={56} height={56} />
            
            <div className="info">
              <p>{coin.name} | {coin.symbol?.toUpperCase() ?? ''}</p>
              <h1>{formatCurrency(coin.market_data?.current_price?.usd)}</h1>
            </div>
          </div>
        </CandlestickChart>
      </div>
    )
  } catch (error) {
    if(process.env.NODE_ENV === "development") {
      console.error("Error fetching coin details:", error);
    }

    return <CoinOverviewFallback />;
  }

}

export default CoinOverview