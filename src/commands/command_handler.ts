import { InteractionGuildMember } from "../../deps.ts";
import { Command, ICommandHandler } from "../types/command.ts";
import { addHandler } from "./handler/add_handler.ts";
import { chartHandler } from "./handler/chart_handler.ts";
import { invalidRequestHandler } from "./handler/invalid_request_handler.ts";
import { removeHandler } from "./handler/remove_handler.ts";
import { setupHandler } from "./handler/setup_handler.ts";

let handler = {
  add: addHandler,
  remove: removeHandler,
  setup: setupHandler,
  chart: chartHandler,
  invalidRequest: invalidRequestHandler,
};

export let commandHandler = {
  get(cmd: Command): ICommandHandler {
    return handler[cmd];
  },
};
