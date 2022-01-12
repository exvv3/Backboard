import {
  ApplicationCommandDataResolvable,
  Client,
  ClientEvents,
  Collection,
  Intents,
} from "discord.js";
import { CommandType } from "../typings/Command";
import glob from "glob";
import { promisify } from "util";
import { RegisterCommandsOptions } from "../typings/clientCommandOptions";
import { Event } from "./Event";

import { Config } from "../data/config";
import conf from "../../config.json";

const globPromise = promisify(glob);

export class Board extends Client {
  public commands: Collection<string, CommandType> = new Collection();
  public aliases: Collection<string, CommandType> = new Collection();
  public config: Config = conf;

  constructor() {
    super({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
  }

  start() {
    this.registerModules();
    this.login(process.env.TOKEN);
  }

  async importFile(filePath: string) {
    return (await import(filePath))?.default;
  }

  async registerCommands({ commands, guildId }: RegisterCommandsOptions) {
    if (guildId) {
      this.guilds.cache.get(guildId)?.commands.set(commands);
      console.log(`Registering commands to ${guildId}`);
    } else {
      this.application?.commands.set(commands);
      console.log("Registering global commands");
    }
  }

  async registerModules() {
    let completed = 0;
    const slashCommands: ApplicationCommandDataResolvable[] = [];
    const commandFiles = await globPromise(
      `${__dirname}/../commands/*{.ts,.js}`
    );
    commandFiles.forEach(async (filePath) => {
      const command: CommandType = await this.importFile(filePath);
      if (!command.name) return;
      this.commands.set(command.name, command);
    });

    this.on("ready", () => {
      this.registerCommands({
        commands: slashCommands,
      });
    });

    // Event
    const eventFiles = await globPromise(`${__dirname}/../events/*{.ts,.js}`);
    eventFiles.forEach(async (filePath) => {
      const event: Event<keyof ClientEvents> = await this.importFile(filePath);
      console.log(event);
      this.on(event.event, event.run);
    });
  }
}
