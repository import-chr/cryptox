import { Separator } from "@/components/ui/separator"
import CandlestickChart from "@/components/CandlestickChart"
import CoinHeader from "@/components/CoinHeader"

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
          <h4>Trend Overview</h4>
        </CandlestickChart>
      </div>

      <Separator className="divider" />

      {children}
    </section>
  )
}

export default LiveDataWrapper