import { CurrencyTime } from "../../types/currency.ts";

let currency = new Map<string, CurrencyTime>();

export let currencyStorage = {
  get(key: string) {
    return currency.get(key);
  },

  has(key: string) {
    return currency.has(key);
  },

  set(key: string, value: CurrencyTime) {
    currency.set(key, value);
  },

  remove(key: string) {
  },
};
