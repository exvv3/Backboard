import { CommandInteractionOptionResolver } from "discord.js";
import board from "../index";
import { Event } from "../structures/Event";
import { ExtendedInteraction } from "../typings/Command";

export default new Event("interactionCreate", async (interaction) => {
  // Chat Input Commands
  if (interaction.isCommand()) {
    await interaction.deferReply();
    const command = board.commands.get(interaction.commandName);
    if (!command)
      return interaction.followUp("You have used a non existent command");

    command.run({
      board,
      args: interaction.options as CommandInteractionOptionResolver,
    });
  }
});
