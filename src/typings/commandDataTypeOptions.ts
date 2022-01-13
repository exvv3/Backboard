import {
  ChatInputApplicationCommandData,
  CommandInteraction,
  CommandInteractionOptionResolver,
  GuildMember,
  PermissionResolvable,
  Message,
} from "discord.js";
import { Board } from "../structures/Client";

/**
 * {
 *  name: "commandname",
 * description: "any description",
 * run: async({ interaction }) => {
 *
 * }
 * }
 */
export interface ExtendedInteraction extends CommandInteraction {
  member: GuildMember;
}

interface RunOptions {
  board: Board;
  message: Message;
  args?: CommandInteractionOptionResolver;
  channel?: Message["channel"];
}

type CallbackFunc = (options: RunOptions) => any;

export type CommandType = {
  userPermissions?: PermissionResolvable[];
  description?: string;
  aliases?: string[];
  callback: CallbackFunc;
} & ChatInputApplicationCommandData;
