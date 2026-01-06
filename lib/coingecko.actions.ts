'use server'

import qs from "query-string"

const BASE_URL = process.env.COINGECKO_BASE_URL;
const API_KEY = process.env.COINGECKO_API_KEY;

if(!BASE_URL) throw new Error("COINGECKO_BASE_URL is not defined in environment variables");
if(!API_KEY) throw new Error("COINGECKO_API_KEY is not defined in environment variables");

export async function fetchFromCoinGecko<T>(
  endpoint: string,
  params?: QueryParams,
  revalidate = 60,
): Promise<T> {
  const url = qs.stringifyUrl({
    url: `${BASE_URL}/${endpoint}`,
    query: params,
  }, { skipEmptyString: true, skipNull: true });

  const response = await fetch(url, {
    headers: {
      "x-cg-demo-api-key": API_KEY,
      "Content-Type": "application/json",
    } as Record<string, string>,
    next: { revalidate },
  });

  if(!response.ok) {
    const errorBody: CoinGeckoErrorBody = await response.json()
      .catch(() => ({}));

      throw new Error(`API Error: ${response.status}: ${errorBody.error || response.statusText}`);
  }

  return response.json();
}

export async function searchCoins(query: string): Promise<SearchCoin[]> {
  const q = query.trim();

  if(!q) return [];

  const searchRes: SearchCoinResponse = await fetchFromCoinGecko("/search", { query: q });

  const baseItemCoin = searchRes.coins.map((coin) => ({
    id: coin.id,
    name: coin.name,
    symbol: coin.symbol,
    market_cap_rank: coin.market_cap_rank,
    thumb: coin.thumb,
    large: coin.large,
    data: {
      price: 0,
      price_change_percentage_24h: 0,
    }
  }));

  if(!baseItemCoin.length) return [];

  const ids = baseItemCoin.slice(0, 10).map(coin => coin.id).join(",");

  const coinsMarketsRes: CoinMarketData[] = await fetchFromCoinGecko("/coins/markets", {
    vs_currency: "usd",
    ids,
  });

  const coinsMarketsItemPrice = new Map(coinsMarketsRes.map(coin => [coin.id, coin]));

  return baseItemCoin.slice(0, 10).map(coin => {
    const prices = coinsMarketsItemPrice.get(coin.id);

    return {
      ...coin,
      data: {
        price: prices?.current_price ?? 0,
        price_change_percentage_24h: prices?.price_change_percentage_24h ?? 0,
      },
    };
  });
}
