import {
  DiscordInteractionResponseTypes,
  InteractionGuildMember,
  sendInteractionResponse,
} from "../../../deps.ts";
import { ICommandHandler } from "../../types/command.ts";

export let invalidRequestHandler: ICommandHandler = {
  async handle(id, token, channelId, member, args) {
    await sendInteractionResponse(id, token, {
      type: DiscordInteractionResponseTypes.ChannelMessageWithSource,
      data: {
        content: `Invalid request.`,
      },
      private: true,
    });
  },
};
