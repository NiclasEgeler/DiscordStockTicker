import {
  ApplicationCommandInteractionData,
  ApplicationCommandInteractionDataOptionWithValue,
  DiscordenoMember,
  EventHandlers,
  Interaction,
} from "../../deps.ts";
import { log } from "../../deps.ts";
import { stockTicker } from "../stock_ticker.ts";
import { Command } from "../types/command.ts";
import { commandHandler } from "./command_handler.ts";
import { discord } from "../discord/discord.ts";


export let handlers: EventHandlers = {
  async ready() {
    log.info("Successfully connected to gateway");
    await discord.createDiscordSlashCommands();
    if (await discord.hasChannelSet()) {
      stockTicker.start();
    }
  },

  async interactionCreate(
    data: Interaction,
    member?: DiscordenoMember | undefined,
  ) {
    if (!data.data) {
      return;
    }
    var interaction = data.data as ApplicationCommandInteractionData;
    var args: any[] = [];
    if (interaction.options) {
      var options = interaction
        .options! as ApplicationCommandInteractionDataOptionWithValue[];
      options.forEach((e) => args.push(e.value));
    }

    var cmd: Command = data.guildId
      ? interaction.name as Command
      : "invalidRequest";

    commandHandler.get(cmd).handle(
      data.id,
      data.token,
      data.channelId!,
      data.guildId!,
      data.member!,
      args,
    );
  },
};

