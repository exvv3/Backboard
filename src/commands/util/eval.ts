import { Command } from "../../structures/Command";
import { Message } from "discord.js";
import board from "../../index";

import { inspect } from "util";

export default new Command({
  name: "eval",
  description: "evaluate javascript",
  aliases: ["e"],
  callback: ({ message, args }) => {
    const code = args.join(" ");

    const evalCode = async (content: string) => {
      if (message.author.id === "537376340102348800") {
        try {
          const result = await eval(content);
          let output = result
  
          if (typeof result !== "string") {
            output = inspect(result)
          }
          message.channel.send(`\`\`\`js\n${output}\`\`\``)
        } catch (error) {
          message.channel.send("There was an error evaluating the content of that command." + `\`\`\`js\n${error}\`\`\``)
        }
      } else {
        return message.channel.send("You do not have permission to run this command.")
      }
    }
    (!code) ? message.channel.send("Please provide arguments") : evalCode(code)
  }
});