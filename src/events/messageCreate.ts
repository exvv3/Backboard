import { Event } from "../structures/Event";
import board from "../index";

export default new Event("messageCreate", (message) => {
  if (
    !message.guild ||
    message.author.bot ||
    !message.content.startsWith(board.config.prefix)
  )
    return;

  const args = message.content
    .slice(board.config.prefix.length)
    .trim()
    .split(/ +/g);

  const cmd = args.join(" ");
  if (!cmd) return;
  const command = board.commands.get(cmd) || board.aliases.get(cmd);
  if (!command) return message.channel.send("This command doesn't exist!");
  command.run({
    board,
    message: message,
  });
});
