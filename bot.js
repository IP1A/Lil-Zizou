const Discord = require('discord.js'); // Подключаем библиотеку discord.js
const robot = new Discord.Client(); // Объявляем, что robot - бот
const comms = require("./comms.js"); // Подключаем файл с командами для бота
const fs = require('fs'); // Подключаем родной модуль файловой системы node.js  
let config = require('./config.json'); // Подключаем файл с параметрами и информацией
const { stringify } = require('querystring');
const ytdl = require("ytdl-core");
let prefix = config.prefix; // «Вытаскиваем» из него префикс
const em = new Discord.MessageEmbed()
robot.on("ready", function() {
  /* При успешном запуске, в консоли появится сообщение «[Имя бота] запустился!» */
  console.log(robot.user.username + " запустился.");
});

const queue = new Map();

robot.once("reconnecting", () => {
  console.log("Перезахожу.");
});

robot.once("disconnect", () => {
  console.log("Вышел.");
});


robot.on('message', (msg) => { // Реагирование на сообщения
  if (msg.author.username != robot.user.username && msg.author.discriminator != robot.user.discriminator) {
    var comm = msg.content.trim() + " ";
    var comm_name = comm.slice(0, comm.indexOf(" "));
    var messArr = comm.split(" ");
    for (comm_count in comms.comms) {
      var comm2 = prefix + comms.comms[comm_count].name;
      if (comm2 == comm_name) {
        comms.comms[comm_count].out(robot, msg, messArr, em);
      }
    }
  }
  const serverQueue = queue.get(msg.guild.id);
  if (msg.author.bot) return;

  if (msg.content.startsWith(`!mplay`)) {
    execute(msg, serverQueue);
    return;
  } else if (msg.content.startsWith(`!mskip`)) {
    skip(msg, serverQueue);
    return;
  } else if (msg.content.startsWith(`!mstop`)) {
    stop(msg, serverQueue);
    return;
  
  }
});
async function execute(message, serverQueue) {
  const args = message.content.split(" ");

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return message.channel.send(
      "Зайди в войс канал ёпта."
    );
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "А мне вообще-то права нужны, чтобы подключаться и говорить."
    );
  }

  const songInfo = await ytdl.getInfo(args[1]);
  const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
   };

  if (!serverQueue) {
    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };

    queue.set(message.guild.id, queueContruct);

    queueContruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueContruct.connection = connection;
      play(message.guild, queueContruct.songs[0]);
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } else {
    serverQueue.songs.push(song);
    return message.channel.send(`${song.title} добавил в список песен`);
  }
}

function skip(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "Зайди в канал, чтобы скипнуть"
    );
  if (!serverQueue)
    return message.channel.send("А скипать-то нечего...");
  serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "Зайди в канал, чтобы поставить на паузу"
    );
    
  if (!serverQueue)
    return message.channel.send("Останавливать нечего...");
    
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("finish", () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.textChannel.send(`Начинаю проигрывать: **${song.title}**`);
}


robot.login(process.env.BOT_TOKEN); // Авторизация бота
