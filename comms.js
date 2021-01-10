const config = require('./config.json'); // Подключаем файл с параметрами и информацией
const Discord = require('discord.js'); // Подключаем библиотеку discord.js
const prefix = config.prefix; // «Вытаскиваем» префикс
const f = new Discord.MessageEmbed()
const talkedRecently = new Set();

function test(r, m, args, f) {

    if (m.author.id == '748483337969991750' | m.author.id == '455378693540544513') {
        m.delete().catch();
    let robotmessage = args = m.content.split(' ');
    
    m.channel.send(f); 
    m.channel.send(robotmessage); 
    } else {
        return m.delete().catch(); r.users.cache.get(m.author.id).send("У вас нет прав"); 
    }
}

function news(robot, m, args, f) {

    if (m.author.id == '748483337969991750' | m.author.id == '455378693540544513') {
        m.delete().catch();
   let robotmessage = args = m.content.split(' '); // Пробелы между словами 

   let img = robotmessage[1]
   robotmessage = m.content.split(img)

   robotmessage.shift();
   robotmessage = robotmessage.join(' ');
   let embed = f
    .setTitle('Информация')
    .setColor(0x00FAFF)
    .setFooter("© «World Of Mine» 2021.", 'https://images-ext-2.discordapp.net/external/v_gEPT-Cwyy8H3kflBB6EDyrO7ImN8nP5SOQGpwztvE/%3Fextra%3DypTuM1P-51ZP5iLQ1cdvn6TED_QsycKtzh-7JwYeppJg8wMlvZcwc-NoyLt7MLDN5wfJjgvOb80Z-RBZ7nbFb2UZJAs_UwBKE_L9fFGmeV2M6FmqiK8omV6LprdwZ51B_Ez1vQW-L_boc38OL7PBbRnT/https/psv4.userapi.com/c856228/u126117826/docs/d6/7cc93685383c/world_of_mine_logo.png')
    .setImage(img)
    .setDescription(robotmessage);
    m.channel.send(embed); 
    } else {
        return m.delete().catch(); m.channel.send("У вас нет прав"); 
    }
}

function aye(robot, m, args, f) {

    if (m.author.id == '748483337969991750' | m.author.id == '455378693540544513') {
    m.delete().catch();
    let robotmessage = args = m.content.split(' ')
   // robotmessage.shift();
   // robotmessage = robotmessage.join(' ');
    let embed = f
    .setTitle('АУЕ ТАТАРЫ')
    .setColor(0x00FAFF)
    .setDescription('СБОР')
    m.channel.send(robotmessage[1]);
    m.channel.send(embed);
    } else {
        return m.delete().catch(); m.channel.send("У вас нет прав"); 
    }
}

function sayp(robot, mess, args, f) {
    
    if (mess.author.id == '748483337969991750' | mess.author.id == '455378693540544513') {

 //   mess.channel.send(args)
    let robotmessage = args = mess.content.split(' '); // Пробелы между словами 
    robotmessage.shift();
    robotmessage = robotmessage.join(' ');
    let embed = f
    .setTitle('Оповещение')
    .setColor(0x00FAFF)
    .setDescription(robotmessage);

    mess.delete().catch(); // Удаление сообщения пользователя после отправки 
    mess.channel.send(embed)
    //mess.channel.send(robotmessage).then(mess.channel.send(mess.author)) /* Отправление в чат сообщения бота */
    //mess.channel.send(attachIsImage(args))
    } else{
        return mess.delete().catch(); mess.channel.send("У вас нет прав"); 
    }
}

function test2(robot, mess, args, f) {

    if (mess.author.id == '748483337969991750' | mess.author.id == '455378693540544513') {

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
    
    if (mess.author.id == '748483337969991750' | mess.author.id == '455378693540544513') {

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