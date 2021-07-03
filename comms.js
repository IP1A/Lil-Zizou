const config = require('./config.json'); // Подключаем файл с параметрами и информацией
const Discord = require('discord.js'); // Подключаем библиотеку discord.js
const prefix = config.prefix; // «Вытаскиваем» префикс
const f = new Discord.MessageEmbed()
const talkedRecently = new Set();

function test(robot, m, args, f) {

    if (m.author.id == '748483337969991750' | m.author.id == '337948830614159361') {
        m.delete().catch();
   let robotmessage = args = m.content.split(' '); // Пробелы между словами 

   let img = robotmessage[1]
   robotmessage = m.content.split(img)
   
   let embed = f
    .setTitle('')
    .setColor(0x00FAFF)
    .setFooter("© «Lotus» 2021.")
    .setImage(img)
    m.channel.send(embed); 
    } else {
        return m.delete().catch(); m.channel.send("У вас нет прав"); 
    }
}

function news(robot, m, args, f) {

    if (m.author.id == '748483337969991750' | m.author.id == '337948830614159361') {
        m.delete().catch();
   let robotmessage = args = m.content.split(' '); // Пробелы между словами 

   let img = robotmessage[1]
   let title = robotmessage[2]
   robotmessage = m.content.split(img)
   robotmessage = m.content.split(title)
   
   robotmessage.shift();
   robotmessage = robotmessage.join(' ');
   let embed = f
    .setTitle(title)
    .setColor(0x00FAFF)
    .setFooter("© «Lotus» 2021.")
    .setImage(img)
    .setDescription(robotmessage);
    m.channel.send(embed); 
    } else {
        return m.delete().catch(); m.channel.send("У вас нет прав"); 
    }
}

function aye(robot, m, args, f) {

    if (m.author.id == '748483337969991750' | m.author.id == '337948830614159361') {
    m.delete().catch();
    let robotmessage = args = m.content.split(' ')
    let embed = f
    .setTitle('АУЕ ТАТАРЫ')
    .setColor(0x00FAFF)
    .setDescription('СБОР')
    .setImage('')
    //m.channel.send(robotmessage[1]);
    m.channel.send(embed);
    } else {
        return m.delete().catch(); m.channel.send("У вас нет прав"); 
    }
}

function sayp(r, m, args, f) {

    if (m.author.id == '748483337969991750' | m.author.id == '337948830614159361') {

        //   m.channel.send(args)
        let robotmessage = args = m.content.split(' '); // Пробелы между словами 
        let title = robotmessage[1]
        robotmessage = m.content.split(title)

        robotmessage.shift();
        robotmessage = robotmessage.join(' ');
        let embed = f
        .setTitle(title)
        .setColor(0x00FAFF)
        .setFooter("© «Lotus» 2021.")
        .setDescription(robotmessage);
        
        m.delete().catch(); // Удаление сообщения пользователя после отправки 
        m.channel.send(embed)
        //m.channel.send(robotmessage).then(m.channel.send(m.author)) /* Отправление в чат сообщения бота */
        //m.channel.send(attachIsImage(args))
    } 
    else {
        return m.delete().catch(); m.channel.send("У вас нет прав"); 
    }
}


function test2(robot, mess, args, f) {

    if (mess.author.id == '748483337969991750' | mess.author.id == '337948830614159361') {

 //   mess.channel.send(args)
    let robotmessage = args = mess.content.split(' '); // Пробелы между словами 
    robotmessage.shift();
    robotmessage = robotmessage.join(' ');

    mess.delete().catch(); // Удаление сообщения пользователя после отправки 
    mess.reply(robotmessage)
    //mess.channel.send(robotmessage).then(mess.channel.send(mess.author)) /* Отправление в чат сообщения бота */
    //mess.channel.send(attachIsImage(args))
    } else {
        return mess.delete().catch(); mess.channel.send("У вас нет прав"); 
    }
}
 
function attachIsImage(msgAttach) {
    var url = msgAttach.url;

    //True if this url is a png image.
    return url.indexOf("png", url.length - "png".length /*or 3*/) !== -1;
    
}
function say(robot, mess, args, f) {
    
    if (mess.author.id == '748483337969991750' | mess.author.id == '337948830614159361') {

 //   mess.channel.send(args)
    let robotmessage = args = mess.content.split(' '); // Пробелы между словами 
    robotmessage.shift();
    robotmessage = robotmessage.join(' ');

    mess.delete().catch(); // Удаление сообщения пользователя после отправки 
    mess.channel.send(robotmessage)
    //mess.channel.send(robotmessage).then(mess.channel.send(mess.author)) /* Отправление в чат сообщения бота */
    //mess.channel.send(attachIsImage(args))
    } else{
        return mess.delete().catch(); mess.channel.send("У вас нет прав"); 
    }
}

function coin_rand(r, m, a, f) {
  //if (m.author.id != '748483337969991750') {return m.delete().catch(); m.channel.send("У вас нет прав"); }

    if (talkedRecently.has(m.author.id)) {
        let embed = f
        .setTitle('Задержка перед отправкой.')
        .setColor(0x00FAFF)
        .setDescription("Подождите 5 секунд\nперед следующей отправкой.");
        r.users.cache.get(m.author.id).send(embed);
    }
    else {

        m.channel.send('Монета подбрасывается...')
        var random = Math.floor(Math.random() * 2)
        if (random === 0) {
            m.channel.send(':eagle: Орёл!')
        } else if (random === 1) {
            m.channel.send(':coin: Решка!')
        }
        
        talkedRecently.add(m.author.id);
         setTimeout(() => {
           talkedRecently.delete(m.author.id);
         }, 5000); // 1000 - одна секунда
     }
}
// Список команд //

var comms_list = [
    {
        name: "sayp",
        "out": sayp,
        about: ""
    },
    {
        name: "img",
        "out": test,
        about: ""
    },
    {
        name: "say",
        out: say,
        about: ""
    },
    {
        name: "coin",
        "out": coin_rand,
        about: ""
    },
    {
        name: "ayetatari",
        "out": aye,
        about: ""
    },
    {
        name: "setnewsblyat",
        "out": news,
        about: ""
    },

];

module.exports.comms = comms_list;
