import {
  cache,
  DiscordInteractionResponseTypes,
  sendInteractionResponse,
} from "../../../deps.ts";
import { validateSymbol } from "../../data/stock.ts";
import { storage } from "../../storage/storage.ts";
import { ICommandHandler } from "../../types/command.ts";

export let addHandler: ICommandHandler = {
  async handle(id, token, channelId, guildId, member, args) {
    var symbol = (args[0]! + "");

    // todo: remove
    var roles = cache.guilds.get(BigInt(guildId))?.roles!;
    console.log(roles.find((e) => e.name == "@everyone"));

    var msg = `Symbol "${symbol}" successfully added`;

    if (validateSymbol(symbol)) {
      await storage.symbol.add(symbol);
    } else {
      msg = `Error: invalid symbol "${symbol}"`;
    }

    await sendInteractionResponse(id, token, {
      type: DiscordInteractionResponseTypes.ChannelMessageWithSource,
      data: {
        content: msg,
      },
      private: true,
    });
  },
};
