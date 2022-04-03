const Discord = require("discord.js");
const express = require('express');
require("dotenv").config();

const commandHandler = require("./commandHandler");

const client = new Discord.Client();

const port = 3000;

app.get("/", (_, res) => res.send("Hello World!"));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

client.on("ready", () => {
  console.log(`Bot logged in as ${client.user.tag}`);
  client.user.setActivity(`Use ${process.env.PREFIX}help`);
});

client.on("message", (message) => {
  if (message.author.id === client.user.id) return;
  commandHandler(message);
});

client.login(process.env.TOKEN);
