import {
  batchEditSlashCommandPermissions,
  cache,
  createSlashCommand,
  deleteSlashCommand,
  DiscordApplicationCommandPermissionTypes,
  getGuild,
  getRoles,
  getSlashCommands,
  log,
} from "../../deps.ts";
import { storage } from "../storage/storage.ts";
import { commands } from "./commands.ts";

export let discord = {
  async createDiscordMessages(contents: string[]) {
    var messages = await storage.discord.getMessages();

    await createNewMessages(contents, messages);
    await removeUnusedMessages(contents, messages);
    await updateMessages(contents, messages);

    //throw new Error("Function not implemented.");
  },

  // todo: remove
  async test(id: bigint) {
    console.log((await getSlashCommands(id)).size);
  },

  async createDiscordSlashCommands() {
    if ((await getSlashCommands()).size != commands.length) {
      log.info("Creating discord slash commands");
      for (var command of commands) {
        createSlashCommand(command);
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

    // todo: remove

    var roles = cache.guilds.get(guildId)?.roles!;
    console.log(roles.find((e) => e.name == "everyone"));

    // await batchEditSlashCommandPermissions(guildId, [{
    //   id: groupId,
    //   permissions: [{
    //     id: groupId,
    //     type: DiscordApplicationCommandPermissionTypes.Role,
    //     permission: true,
    //   }],
    // }]);
  },

  async hasChannelSet() {
    return !!(await storage.discord.getChannelId());
  },

  async setChannelAndRole(channelId: string, roleId: string) {
    await storage.discord.updateChannelAndRoleId(channelId, roleId);
  },
};

// todo: implement!

async function createNewMessages(contents: string[], messages: string[]) {
  for (var i = messages.length + 1; i < contents.length; i++) {
    createMessage(contents[i]);
    return;
  }
}

async function removeUnusedMessages(contents: string[], messages: string[]) {
  for (var i = messages.length; i > contents.length; i--) {
    deleteMessage(messages[i]);
    return;
  }
}

async function updateMessages(contents: string[], messages: string[]) {
  for (var i = 0; i < contents.length; i++) {
    updateMessage(contents[i], messages[i]);
  }
}

async function deleteMessage(messageId: string) {
  // todo: implement
}
async function createMessage(content: string) {
  // todo: implement
}

async function updateMessage(content: string, messageId: string) {
  // todo: implement
}
