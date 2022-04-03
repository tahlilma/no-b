const Discord = require("discord.js");
require("dotenv").config();

const commandHandler = require("./commandHandler");

const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Bot logged in as ${client.user.tag}`);
  client.user.setActivity(`Use ${process.env.PREFIX}help`);
});

client.on("message", (message) => {
  if (message.author.id === client.user.id) return;
  commandHandler(message);
});

client.login(process.env.TOKEN);
