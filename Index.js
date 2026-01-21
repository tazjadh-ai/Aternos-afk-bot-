const mineflayer = require("mineflayer");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Keep-alive web server
app.get("/", (req, res) => {
  res.send("Bot is running");
});

app.listen(PORT, () => {
  console.log("Web server online");
});

// Minecraft Bot Config
const bot = mineflayer.createBot({
  host: process.env.SERVER_IP,
  port: Number(process.env.SERVER_PORT),
  username: process.env.BOT_USERNAME,
  version: process.env.MC_VERSION
});

// On spawn
bot.on("spawn", () => {
  console.log("Bot joined server");

  // Anti AFK system
  setInterval(() => {
    bot.setControlState("jump", true);
    setTimeout(() => bot.setControlState("jump", false), 500);

    bot.chat("hi"); // optional
  }, 60000);
});

// Auto reconnect
bot.on("end", () => {
  console.log("Disconnected... Reconnecting");
  setTimeout(() => process.exit(), 5000);
});

bot.on("error", err => {
  console.log("Error:", err);
});
