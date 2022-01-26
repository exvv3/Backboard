import { CommandType } from "../typings/commandDataTypeOptions";

export class Command {
  constructor(commandOptions: CommandType) {
    Object.assign(this, commandOptions);
  }
}
