import { Command } from "../structures/Command";

export default new Command({
  name: "code",
  description: "replies with pong",
  aliases: ["c", "verify"],
  run: ({ message }) => {
    function createRandomString() {
      var string = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(){}[]:;'/?.><,~`|";

      for (var i = 0; i < 15; i++)
        string += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );

      return string;
    }

    message.channel.send(
      "Here's your code: " + "```" + `${createRandomString()}` + "```"
    );
  },
});
