import { log } from "../deps.ts";
import { tickSymbols, validateSymbol } from "./data/stock.ts";
import { discord } from "./discord/discord.ts";
import { storage } from "./storage/storage.ts";
import { formatStocksInChunks } from "./utils/formatter.ts";

let interval: number;
let chunkSize = 9;

/**
 * Handles incoming symbols, info requests and stock ticking
 */
export let stockTicker = {
  running: false,
  setup: false,

  async start() {
    if (!this.running) {
      log.info("Starting ticker");
      this.running = true;
      interval = setInterval(async () => {
        await this.tick();
      }, 5 * 1e3);
    }
  },

  async stop() {
    if (this.running) {
      log.info("Stopping ticker");
      this.running = false;
      clearInterval(interval);
    }
  },

  async tick() {
    var res = await tickSymbols(await storage.symbol.getAll());
    var contents = formatStocksInChunks(res, 9);
    discord.createDiscordMessages(contents);
  },
};

