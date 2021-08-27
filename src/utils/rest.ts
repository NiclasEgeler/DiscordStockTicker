import { log } from "../../deps.ts";

export let rest = {
  // Todo: error handling, abstract further with private run method?
  async get<T>(endpoint: string): Promise<T | undefined> {
    var result = await fetch(endpoint).catch((e) => log.error(e));
    return result.status != 200 ? undefined : await result.json();
  },
};
