const mineflayer = require("mineflayer");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Keep alive web server
app.get("/", (req, res) => {
  res.send("Tinku bot running");
});

app.listen(PORT, () => {
  console.log("Web server active");
});

// Create Minecraft Bot
function startBot() {

  const bot = mineflayer.createBot({
    host: process.env.SERVER_IP,
    port: Number(process.env.SERVER_PORT),
    username: process.env.BOT_USERNAME,
    version: process.env.MC_VERSION
  });

  bot.on("spawn", () => {
    console.log("Tinku joined server");

    // Jump anti-afk
    setInterval(() => {
      bot.setControlState("jump", true);
      setTimeout(() => bot.setControlState("jump", false), 500);
    }, 60000);

    // Chat spam
    setInterval(() => {
      const msgs = [
        "hello",
        "anyone online?",
        "nice server",
        "afk grinding",
        "tinku online"
      ];

      const random = msgs[Math.floor(Math.random() * msgs.length)];
      bot.chat(random);

    }, 90000);
  });

  // Auto reconnect
  bot.on("end", () => {
    console.log("Disconnected... Restarting");
    setTimeout(startBot, 5000);
  });

  bot.on("error", err => {
    console.log("Error:", err);
  });
}

startBot();
