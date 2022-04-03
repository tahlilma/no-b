const axios = require("axios");
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

      message.channel.send(res.data.url);
    } catch (err) {
      message.channel.send("Fuck You");
      console.error(err);
      return;
    }
  },
};
