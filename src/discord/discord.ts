import {
  cache,
  createSlashCommand,
  deleteMessage,
  deleteSlashCommand,
  DiscordApplicationCommandPermissionTypes,
  editMessage,
  editSlashCommandPermissions,
  getSlashCommands,
  log,
  sendMessage,
} from "../../deps.ts";
import { storage } from "../storage/storage.ts";
import { commands } from "./commands.ts";

export let discord = {
  async createDiscordMessages(contents: string[]) {
    await removeUnusedMessages(contents);
    await updateMessages(contents);
    await createNewMessages(contents);
  },

  async createDiscordSlashCommands() {
    if ((await getSlashCommands()).size != commands.length) {
      log.info("Creating discord slash commands");
      for (var command of commands) {
        await createSlashCommand(command);
      }
    }
  },

  async deleteAllSlashCommands() {
    var cmds = await (await getSlashCommands())
      .array();
    for (var c of cmds) {
      await deleteSlashCommand(c.id);
    }
  },

  async updatePermissionForGuild(guildId: bigint, groupId: string) {
    var roles = cache.guilds.get(guildId)?.roles!;
    var everyone = roles.find((e) => e.name == "@everyone")!;
    if (everyone.id == BigInt(groupId)) {
      return;
    }

    var slashCommands = (await getSlashCommands()).array();

    for (var command of slashCommands) {
      await editSlashCommandPermissions(guildId, command.id, [{
        id: everyone.id + "",
        type: DiscordApplicationCommandPermissionTypes.Role,
        permission: false,
      }, {
        id: groupId,
        type: DiscordApplicationCommandPermissionTypes.Role,
        permission: true,
      }]);
    }
  },

  async hasChannelSet() {
    return !!(await storage.discord.getChannelId());
  },

  async setChannelAndRole(channelId: string, roleId: string) {
    await storage.discord.updateChannelAndRoleId(channelId, roleId);
  },
};

async function createNewMessages(contents: string[]) {
  var messages = await storage.discord.getMessages();
  for (var i = messages.length; i < contents.length; i++) {
    await createMessage(contents[i]);
  }
}

async function removeUnusedMessages(contents: string[]) {
  var messages = await storage.discord.getMessages();
  for (var i = messages.length; contents.length < i; i--) {
    await removeMessage(messages[i - 1]);
  }
}

async function updateMessages(contents: string[]) {
  var messages = await storage.discord.getMessages();
  for (var i = 0; i < messages.length; i++) {
    await updateMessage(contents[i], messages[i]);
  }
}

async function removeMessage(messageId: string) {
  await deleteMessage(
    BigInt(await storage.discord.getChannelId()! as string),
    BigInt(messageId),
  );
  await storage.discord.removeMessage(messageId);
}

async function createMessage(content: string) {
  var msg = await sendMessage(
    BigInt(await storage.discord.getChannelId()! as string),
    content,
  );
  await storage.discord.addMessage(msg.id + "");
}

async function updateMessage(content: string, messageId: string) {
  await editMessage(
    BigInt(await storage.discord.getChannelId()! as string),
    BigInt(messageId),
    content,
  );
}
