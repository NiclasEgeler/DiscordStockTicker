import {
  DiscordInteractionResponseTypes,
  InteractionGuildMember,
  sendInteractionResponse,
} from "../../../deps.ts";
import { discord } from "../../discord/discord.ts";
import { stockTicker } from "../../stock_ticker.ts";
import { ICommandHandler } from "../../types/command.ts";

export let setupHandler: ICommandHandler = {
  async handle(id, token, channelId, guildId, member, args) {

    var roleId: string = args[0]!;
    var channelSet = await discord.hasChannelSet();

    await discord.setChannelAndRole(channelId, roleId);

    if (!channelSet) {
      await stockTicker.start();
    }

    // todo: enable commands
    await discord.updatePermissionForGuild(BigInt(guildId), roleId);

    await sendInteractionResponse(id, token, {
      type: DiscordInteractionResponseTypes.ChannelMessageWithSource,
      data: {
        content: `Setup bot <#${channelId}> for role <@&${roleId}>`,
      },
      private: true,
    });
  },
};
