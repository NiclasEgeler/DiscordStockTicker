import type { Result, StockData, YahooStockData } from "../types/stock.ts";
import { endpoint } from "../utils/endpoints.ts";
import { rest } from "../utils/rest.ts";
import { getRate } from "./currency.ts";

/**
 * Query information about last tick for `symbols`
 */
export async function tickSymbols(
  symbols: string[]
): Promise<StockData[]> {
  var result = await rest.get<YahooStockData>(endpoint.YAHOO_STOCK(symbols));
  var ret: StockData[] = [];
  if (result?.quoteResponse.result && result?.quoteResponse.result.length > 0) {
    for (var info of result.quoteResponse.result) {
      ret.push(
        await mapToStockModel(
          info,
          await getRate(info.currency, Deno.env.get("currency")!),
        ),
      );
    }
  }
  return ret;
}

/**
 * Query information about `symbol` in `range`
 */
export async function stockInfo(
  symbol: string,
  range: string,
): Promise<string | undefined> {
  // Todo: implement with StockModel and RangeModel (D, W, M, 3M, Y, ALL)?

  return "";
}

export async function validateSymbol(symbol: string): Promise<boolean> {
  // Todo: implement
  return true;
}

function mapToStockModel(info: Result, rate: number): StockData {
  var stock: StockData = {
    symbol: info.symbol,
    name: info.longName,
    dayHigh: info.regularMarketDayHigh * rate,
    dayLow: info.regularMarketDayLow * rate,
    w52High: info.fiftyTwoWeekHigh * rate,
    w52Low: info.fiftyTwoWeekLow * rate,
    prevClosing: info.regularMarketPreviousClose * rate,
    open: info.regularMarketOpen * rate,
    value: info.regularMarketPrice * rate,
    isActive: false,
    isRegular: false,
  };

  if (info.marketState == "REGULAR") {
    stock.isActive = true;
    stock.isRegular = true;
  } else if (
    info.marketState == "POST" && info.postMarketPrice &&
    info.postMarketPrice != 0.0
  ) {
    stock.isActive = true;
    stock.value = info.postMarketPrice * rate;
  } else if (
    info.marketState == "PRE" && info.preMarketPrice &&
    info.preMarketPrice != 0.0
  ) {
    stock.value = info.preMarketPrice * rate;
  } else if (info.postMarketPrice && info.postMarketPrice != 0.0) {
    stock.value = info.postMarketPrice * rate;
  } else if (info.marketState == "POST") {
    stock.isActive = true;
  }

  return stock;
}
