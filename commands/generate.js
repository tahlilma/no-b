const axios = require("axios");
const { MessageAttachment } = require("discord.js");
const sharp = require("sharp");
const download = require("download");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

module.exports = {
  name: "generate",
  alt: "g",
  handler: async (message) => {
    try {
      const generateMeme = async (params) => {
        const baseURL = "https://api.imgflip.com/caption_image";
        const urlParams = Object.keys(params)
          .map((key) => `${key}=${params[key]}`)
          .join("&");
        const res = await axios.post(`${baseURL}?${urlParams}`);
        return res.data;
      };

      const fullMessage = message.content.split(" ");
      fullMessage.shift();
      const payload = fullMessage.join(" ");
      if (!payload) return;

      const res = await generateMeme({
        username: process.env.NAME,
        password: process.env.PASSWORD,
        template_id: 368228430,
        text0: payload,
      });

      const fileName = res.data.page_url.split("/").at(-1);
      await download(res.data.url, "./temp");
      await sharp(`./temp/${fileName}.jpg`)
        .extract({
          top: 4,
          left: 4,
          width: 485,
          height: 415,
        })
        .toFile(`./temp/${fileName}-cropped.jpg`);

      const image = new MessageAttachment(`./temp/${fileName}-cropped.jpg`);
      await message.channel.send(image);

      fs.readdir("./temp", (err, files) => {
        if (err) throw err;
        for (const file of files) {
          fs.unlink(path.join("./temp", file), (err) => {
            if (err) throw err;
          });
        }
        console.log("File Sent And Deleted");
      });
    } catch (err) {
      message.channel.send("Fuck You");
      console.error(err);
      return;
    }
  },
};
