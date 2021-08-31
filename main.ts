import { env, log, startBot } from "./deps.ts";
import { handlers } from "./src/commands/event_handlers.ts";
import { getRate } from "./src/data/currency.ts";

// configure logger
await log.setup({
  handlers: {
    fmt: new log.handlers.ConsoleHandler("DEBUG", {
      formatter: (logRecord) =>
        `[${logRecord.datetime.toUTCString()}] ${logRecord.msg}`,
    }),
  },
  loggers: {
    default: {
      level: "DEBUG",
      handlers: ["fmt"],
    },
  },
});

// load env variables
env({ export: true });

// check env vars
var req = ["TOKEN", "CURRENCY"];
for (var v of req) {
  var res = Deno.env.get(v);
  if (!res) {
    log.error(`No ${v.toLocaleLowerCase()} provided`);
    Deno.exit(-1);
  }
}

// start discord bot
await startBot({
  token: Deno.env.get("TOKEN")!,
  intents: ["Guilds", "GuildMessages"],
  eventHandlers: handlers,
}).catch((e) => {
  log.error("Failed to start discord bot");
  Deno.exit(-1);
});
