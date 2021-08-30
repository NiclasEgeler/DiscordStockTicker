import {
  cache,
  DiscordInteractionResponseTypes,
  hasGuildPermissions,
  InteractionGuildMember,
  sendInteractionResponse,
} from "../../../deps.ts";
import { discord } from "../../discord/discord.ts";
import { stockTicker } from "../../stock_ticker.ts";
import { ICommandHandler } from "../../types/command.ts";

export let setupHandler: ICommandHandler = {
  async handle(id, token, channelId, guildId, member, args) {
    console.log("setup called");

    var roleId: string = args[0]!;
    var channelSet = await discord.hasChannelSet();

    var msg =
      `Only the owner of this Server or an admin is allowed to Setup this Bot`;

    // only server owner / admin are allowed call setup
    if (
      cache.guilds.find((e) => e.id == BigInt(guildId))!.ownerId ==
        BigInt(member.user.id) ||
      await hasGuildPermissions(BigInt(guildId), BigInt(member.user.id), [
        "ADMINISTRATOR",
      ])
    ) {
      await discord.setChannelAndRole(channelId, roleId);

      if (!channelSet) {
        await stockTicker.start();
      }

      await discord.updatePermissionForGuild(BigInt(guildId), roleId);
      msg = `Setup bot <#${channelId}> for role <@&${roleId}>`;
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
