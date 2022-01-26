import { Command } from "../../structures/Command";
import { Message } from "discord.js";
import board from "../../index";

export default new Command({
  name: "verify",
  description: "replies with pong",
  aliases: ["v"],
  callback: ({ message }) => {
    const createRandomString = (repeatUntil) => {
      let string = "";
      let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(){}[]:;'/?.><,~`|";
      for (var i = 0; i < repeatUntil; i++)
        string += characters.charAt(Math.floor(Math.random() * characters.length));
      return string;
    }
    message.reply("Reply with your dribbble username.")

    const filter = (msg: Message) => msg.author.id === message.author.id
    const bucket = message.channel.createMessageCollector({ filter, max: 1, time: 1000 * 20 })

    bucket.on("collect", (message) => { 
      board.dribbbleUsernames.set(message.content, message.author)
    })

    bucket.on("end", (collected) => { 
      message.reply(`${message.author}, post this in your dribbble bio: ` + "```" + `${createRandomString(10)}` + "```\n Awaiting bio update...")
    })

    }

});