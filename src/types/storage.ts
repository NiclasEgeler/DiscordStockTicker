import { Document } from "../../deps.ts";

export type TableName = "currency" | "symbol" | "messageRef";

// export interface IStorage<K, V> {
//   get(key: K): V | undefined;
//   has(key: K): boolean;
//   set(key: K, value: V): void;
//   remove(key: K): void;
// }

// export interface ISetStorage<V> {
//   add(value: V): void;
//   getAll(): Array<V>;
//   remove(value: V): void;
//   has(value: V): void;
// }

export interface SymbolDbItem extends Document {
  name: string;
}

export interface MessageDbItem extends Document {
  messageRef: string;
}

export interface ChannelDbItem extends Document {
  channelId: string;
  roleId: string;
}
