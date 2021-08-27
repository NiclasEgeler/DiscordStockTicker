import { FileDB } from "../../deps.ts";
import {
  ChannelDbItem,
  MessageDbItem,
  SymbolDbItem,
} from "../types/storage.ts";

let database = new FileDB({ rootDir: "./db", isAutosave: true });

export let db = {
  async getMessageCollection() {
    return await database.getCollection<MessageDbItem>("message");
  },

  async getChannelCollection() {
    return await database.getCollection<ChannelDbItem>("channel");
  },

  async getSymbolCollection() {
    return await database.getCollection<SymbolDbItem>("symbols");
  },
};
