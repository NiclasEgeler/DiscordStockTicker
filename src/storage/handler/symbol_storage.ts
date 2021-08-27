import { db } from "../db.ts";

let col = await db.getSymbolCollection();
let symbolsCache = new Set<string>(
  (await col.findMany((e) => true)).retrieveData().map((e) => e.name),
);

export let symbolStorage = {
  async has(value: string): Promise<boolean> {
    value = value.toUpperCase();
    return symbolsCache.has(value);
  },

  async add(value: string) {
    value = value.toUpperCase();

    if (!await this.has(value)) {
      symbolsCache.add(value);

      await col.insertOne({ name: value });
      await col.save();
    }
  },

  async remove(value: string) {
    value = value.toUpperCase();

    symbolsCache.delete(value);

    col.deleteOne((e) => e.name == value);
    await col.save();
  },

  async getAll(): Promise<Array<string>> {
    return [...symbolsCache];
  },
};
