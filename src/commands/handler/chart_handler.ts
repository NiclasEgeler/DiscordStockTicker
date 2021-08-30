import {
  DiscordInteractionResponseTypes,
  sendInteractionResponse,
} from "../../../deps.ts";
import { validateSymbol } from "../../data/stock.ts";
import { ICommandHandler } from "../../types/command.ts";

export let chartHandler: ICommandHandler = {
  async handle(id, token, channelId, guildId, member, args) {
    console.log("chart called");
    
    var symbol = (args[0]! + "");

    var msg = "Coming soon...";
    var isPrivate = true;

    await sendInteractionResponse(id, token, {
      type: DiscordInteractionResponseTypes.ChannelMessageWithSource,
      data: {
        content: msg,
      },
      private: isPrivate,
    });
  },
};
