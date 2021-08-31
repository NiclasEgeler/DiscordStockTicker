import type { Currency } from "../types/currency.ts";
import { endpoint } from "../utils/endpoints.ts";
import { rest } from "../utils/rest.ts";

let currency = new Map<string, number>();
let initDate = Date.now();
/**
 * Returns transform rate from ISO-4217 currency code `from` to `to`
 */
export async function getRate(from: string, to: string): Promise<number> {
  // Todo: renew after a day?
  if (from.toUpperCase() == to.toUpperCase()) {
    return 1;
  }
  let key = combine(from, to);
  let val: number = 1;
  if (currency.has(key)) {
    val = currency.get(key)!;
  } else {
    val = await getCurrencyTranformRate(from, to);
    currency.set(key, val);
  }
  return val;
}

async function getCurrencyTranformRate(
  from: string,
  to: string,
): Promise<number> {
  var result = await rest.get<Currency>(endpoint.CURRENCY(from, to));
  return result?.quotes[to] ? result.quotes[to] : 1;
}

function combine(from: string, to: string) {
  return `${from.toUpperCase()}:${to.toUpperCase()}`;
}
