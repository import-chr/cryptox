import { Separator } from "@/components/ui/separator"
import CandlestickChart from "@/components/CandlestickChart"
import CoinHeader from "@/components/CoinHeader"
import PoweredByCGAPI from "@/components/PoweredByCGAPI"

const LiveDataWrapper = ({ coinId, coin, coinOHLCData, children }: LiveDataProps) => {
  return (
    <section id="live-data-wrapper">
      <CoinHeader
        name={coin.name}
        image={coin.image.large}
        price={coin.market_data.current_price.usd}
        priceChangePercentage24h={coin.market_data.price_change_percentage_24h_in_currency.usd}
        priceChangePercentage30d={coin.market_data.price_change_percentage_30d_in_currency.usd}
        priceChange24h={coin.market_data.price_change_24h_in_currency.usd}
      />
      <Separator className="divider" />

      <div className="trend">
        <CandlestickChart coinId={coinId} data={coinOHLCData}>
          <div className="flex items-start justify-between">
            <h4>Trend Overview</h4>

            <PoweredByCGAPI svgClassName="mt-1 pr-5" size="lg" />
          </div>
        </CandlestickChart>
      </div>

      <Separator className="divider" />

      {children}
    </section>
  )
}

export default LiveDataWrapper