import {
  DiscordInteractionResponseTypes,
  sendInteractionResponse,
} from "../../../deps.ts";
import { validateSymbol } from "../../data/stock.ts";
import { storage } from "../../storage/storage.ts";
import { ICommandHandler } from "../../types/command.ts";

export let removeHandler: ICommandHandler = {
  async handle(id, token, channelId, guildId, member, args) {
    var symbol = (args[0]! + "");

    var msg = "Symbol successfully removed";

    if (storage.symbol.has(symbol) && validateSymbol(symbol)) {
      await storage.symbol.remove(symbol);
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
