const Discord = require('discord.js'); // Подключаем библиотеку discord.js
const robot = new Discord.Client(); // Объявляем, что robot - бот
const comms = require("./comms.js"); // Подключаем файл с командами для бота
const fs = require('fs'); // Подключаем родной модуль файловой системы node.js  
let config = require('./config.json'); // Подключаем файл с параметрами и информацией
const { stringify } = require('querystring');
let token = config.token; // «Вытаскиваем» из него токен
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


robot.login(token);

robot.on('raw', event => {
  if (event.t === 'MESSAGE_REACTION_ADD') {
    if (event.d.message_id === '860793633215873035')
    {
      if (event.d.emoji.name === "📰") {
        robot.channels.cache.get(event.d.channel_id).messages.fetch(event.d.message_id)
        .then(msg => {
          msg.guild.members.cache.get(event.d.user_id).roles.add('860778120856469534');
        })
      };
      if (event.d.emoji.name === "🗓️") {
        robot.channels.cache.get(event.d.channel_id).messages.fetch(event.d.message_id)
        .then(msg => {
          msg.guild.members.cache.get(event.d.user_id).roles.add('860781415800504341');
        })
      };
    };
  };
  if (event.t === 'MESSAGE_REACTION_REMOVE') {
    if (event.d.message_id === '860793633215873035')
    {
      console.log(event.d.emoji.name)
      if (event.d.emoji.name === "📰") {
        robot.channels.cache.get(event.d.channel_id).messages.fetch(event.d.message_id)
        .then(msg => {
        msg.guild.members.cache.get(event.d.user_id).roles.remove('860778120856469534');
        })
      };
      if (event.d.emoji.name === "🗓️") {
        robot.channels.cache.get(event.d.channel_id).messages.fetch(event.d.message_id)
        .then(msg => {
        msg.guild.members.cache.get(event.d.user_id).roles.remove('860781415800504341');
        })
      };
    };
  }
});
robot.on("guildMemberAdd", (member) => {
//  member.roles.add("798560953754320986")
});
