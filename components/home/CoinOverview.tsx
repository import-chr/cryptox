import { CoinOverviewFallback } from "@/components/home/fallback"
import { fetchFromCoinGecko } from "@/lib/coingecko.actions"
import { formatCurrency } from "@/lib/utils"
import Image from "next/image"
import CandlestickChart from "@/components/CandlestickChart"
import PoweredByCGAPI from "@/components/PoweredByCGAPI"

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
          <div className="flex items-start justify-between pt-2">
            <div className="header">
              <Image src={coin.image?.large ?? '/assets/icon.png'} alt={coin.name ?? 'Coin'} width={56} height={56} />
              
              <div className="info">
                <p>{coin.name} | {coin.symbol?.toUpperCase() ?? ''}</p>
                <h1>{formatCurrency(coin.market_data?.current_price?.usd)}</h1>
              </div>
            </div>

            <PoweredByCGAPI svgClassName="mt-1" size="lg" />
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