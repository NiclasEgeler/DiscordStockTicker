export let endpoint = {
  CURRENCY: (from: string, to: string) =>
    `https://api.xavii.us/latest?base=${from}&symbols=${to}`,
  YAHOO_STOCK: (symbols: string[]) =>
    `https://query1.finance.yahoo.com/v7/finance/quote?lang=en-US&region=US&corsDomain=finance.yahoo.com&symbols=${
      symbols.join(",")
    }`,
};
