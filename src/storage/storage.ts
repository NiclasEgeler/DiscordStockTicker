import { currencyStorage } from "./handler/currency_storage.ts";
import { discordStorage } from "./handler/discord_storage.ts";
import { symbolStorage } from "./handler/symbol_storage.ts";

export let storage = {
  currency: currencyStorage,
  symbol: symbolStorage,
  discord: discordStorage,
};
