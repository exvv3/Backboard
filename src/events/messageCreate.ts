import { Event } from "../structures/Event";
import board from "../index";

export default new Event("messageCreate", (message) => {
  if (
    !message.guild ||
    message.author.bot ||
    !message.content.startsWith(board.config.prefix)
  )
    return;

  const args = message.content.substring(board.config.prefix.length)
    .trim()
    .split(/ +/);

  const cmd = args.shift().toLowerCase()
  if (!cmd) return;
  const command = board.commands.get(cmd) || board.aliases.get(cmd);
  if (!command)
    return message.channel.send(
      "This command doesn't exist, though, if you have a feature suggestion hit us up!"
    );
  command.callback({
    args: args,
    board,
    message: message,
  });
});
