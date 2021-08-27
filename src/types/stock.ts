export interface YahooStockData {
  quoteResponse: QuoteResponse;
}

export interface QuoteResponse {
  result: Result[];
  error: null;
}

export interface Result {
  language: string;
  region: string;
  quoteType: string;
  quoteSourceName: string;
  triggerable: boolean;
  currency: string;
  firstTradeDateMilliseconds: number;
  priceHint: number;
  postMarketChangePercent: number;
  postMarketTime: number;
  postMarketPrice: number;
  postMarketChange: number;
  preMarketPrice: number;
  preMarketChange: number;
  preMarketChangePercent: number;
  regularMarketChange: number;
  regularMarketChangePercent: number;
  regularMarketTime: number;
  regularMarketPrice: number;
  regularMarketDayHigh: number;
  regularMarketDayRange: string;
  regularMarketDayLow: number;
  regularMarketVolume: number;
  regularMarketPreviousClose: number;
  bid: number;
  ask: number;
  bidSize: number;
  askSize: number;
  exchange: string;
  shortName: string;
  longName: string;
  messageBoardId: string;
  exchangeTimezoneName: string;
  exchangeTimezoneShortName: string;
  gmtOffSetMilliseconds: number;
  market: string;
  esgPopulated: boolean;
  forwardPE: number;
  priceToBook: number;
  sourceInterval: number;
  exchangeDataDelayedBy: number;
  fullExchangeName: string;
  financialCurrency: string;
  regularMarketOpen: number;
  averageDailyVolume3Month: number;
  averageDailyVolume10Day: number;
  fiftyTwoWeekLowChange: number;
  fiftyTwoWeekLowChangePercent: number;
  fiftyTwoWeekRange: string;
  fiftyTwoWeekHighChange: number;
  fiftyTwoWeekHighChangePercent: number;
  fiftyTwoWeekLow: number;
  fiftyTwoWeekHigh: number;
  earningsTimestamp: number;
  earningsTimestampStart: number;
  earningsTimestampEnd: number;
  trailingPE: number;
  epsTrailingTwelveMonths: number;
  epsForward: number;
  epsCurrentYear: number;
  priceEpsCurrentYear: number;
  sharesOutstanding: number;
  bookValue: number;
  fiftyDayAverage: number;
  fiftyDayAverageChange: number;
  fiftyDayAverageChangePercent: number;
  twoHundredDayAverage: number;
  twoHundredDayAverageChange: number;
  twoHundredDayAverageChangePercent: number;
  marketCap: number;
  tradeable: boolean;
  marketState: string;
  displayName: string;
  symbol: string;
}

export interface StockData {
  symbol: string;
  name: string;
  dayHigh: number;
  dayLow: number;
  w52High: number;
  w52Low: number;
  prevClosing: number;
  open: number;
  value: number;
  isActive: boolean;
  isRegular: boolean;
}
