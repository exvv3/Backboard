import { Command } from "../structures/Command";
import { Message } from "discord.js";

export default new Command({
  name: "verify",
  description: "replies with pong",
  aliases: ["c"],
  callback: ({ message }) => {
    const createRandomString = (repeatUntil) => {
      let string = "";
      let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(){}[]:;'/?.><,~`|";
      for (var i = 0; i < repeatUntil; i++)
        string += characters.charAt(Math.floor(Math.random() * characters.length));
      return string;
    }

    const filter = (msg: Message) => msg.author.id === message.author.id;
    const bucket = message.channel.createMessageCollector({ filter, max: 1, time: 1000 * 20 })

    let abstracts = []

    bucket.on("collect", (message) => { abstracts.push(message.content) })
    bucket.on("end", (collected) => { message.channel.send(`${message.author}, post this in your dribbble bio: ` +
        "```" +
        `${createRandomString(10)}` +
        "```\n Awaiting bio update..."
    )});

    message.reply(
      "Respond with your dribbble username"
    );
  },
});