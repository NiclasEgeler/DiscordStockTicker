import { InteractionGuildMember } from "../../deps.ts";

export interface ICommandHandler {
  handle(
    id: string,
    token: string,
    channelId: string,
    guildId: string,
    member: InteractionGuildMember,
    args: Array<any>,
  ): void;
}

export type Command = "add" | "remove" | "setup" | "chart" | "invalidRequest";
