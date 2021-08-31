import { db } from "../db.ts";

let messageCol = await db.getMessageCollection();
let channelCol = await db.getChannelCollection();
let messageCache = new Set<string>(
  (await messageCol.findMany((e) => true)).retrieveData().map((e) =>
    e.messageRef
  ),
);
let channelId: string = channelCol.findOne((e) => true)?.channelId;
let roleId: string = channelCol.findOne((e) => true)?.roleId;

export let discordStorage = {
  async getChannelId(): Promise<string | undefined> {
    return channelId;
  },

  async getRoleId(): Promise<string | undefined> {
    return roleId;
  },

  async getMessages(): Promise<Array<string>> {
    return [...messageCache];
  },

  async addMessage(id: string) {
    messageCache.add(id);
    await messageCol.insertOne({ messageRef: id });
  },

  async removeMessage(id: string) {
    if (messageCache.has(id)) {
      messageCache.delete(id);
      await messageCol.deleteOne((e) => e.messageRef == id);
    }
  },

  async updateChannelAndRoleId(chId: string, roId: string) {
    if (channelId) {
      var dbId = await channelCol.findOne((e) => true).id;
      await channelCol.updateOne((e) => e.id == dbId, (e) => {
        e.channelId = chId;
        e.roleId = roId;
        return e;
      });
      channelId = chId;
      roleId = roId;
      return;
    }
    channelId = chId;
    roleId = roId;
    await channelCol.insertOne({ channelId: chId, roleId: roId });
  },
};
