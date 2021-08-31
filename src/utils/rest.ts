import { log } from "../../deps.ts";

export let rest = {
  async get<T>(endpoint: string): Promise<T | undefined> {
    var result = await fetch(endpoint).catch((e) => log.error(e));
    return result.status != 200 ? undefined : await result.json();
  },
};
