const Discord = require('discord.js');
const client = new Discord.Client();

const defaultPrefix = "!"

const dotenv = require('dotenv');
const fs = require('fs');
const importFresh = require('import-fresh');
dotenv.config();

var cache = {}

// functions

function findCommand(command) {
    var files = fs.readdirSync("./commands");

    // remove prefix
    command = command.substring(defaultPrefix.length)

    for (index = 0; index < files.length; index++) {
        var info = null;

        if (cache[`./commands/${files[index]}`]) {
            info = cache[`./commands/${files[index]}`];
        } else {
            info = require(`./commands/${files[index]}`);
            cache[`./commands/${files[index]}`] = info;
        }

        if (info.commandInfo.name == command) {
            return info;
        }
    }

    return false
}

function checkAdminStatus(userId) {
    var admins = importFresh("./admins.json");

    for (index = 0; index < admins.length; index++) {
        if (userId == admins[index]) {
            return true
        }
    }

    return false
}

function getUserFromMention(mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.cache.get(mention);
	}
}

// ---------

// push globals

global.checkAdminStatus = checkAdminStatus;
global.getUserFromMention = getUserFromMention;

global.fs = fs;
global.client = client;
global.importFresh = importFresh;
global.googleImageQuery = require('google-search-results-nodejs/lib/GoogleSearch');
global.dirname = __dirname;

// ------------

client.on('ready', () => {
    console.log("booted.")
})
 
client.on("message", msg => {
    if (msg.content.toLowerCase().startsWith(defaultPrefix) && msg.author.id != client.user.id) {
        console.log(msg.content)
        var command = msg.content.toLowerCase()
        command = command.split(" ");

        if (command[0].includes("help")) {
            var disabledCounter = 0
            var helpMessage = ""
            var files = fs.readdirSync("./commands");

            for (index = 0; index < files.length; index++) {
                var info = require(`./commands/${files[index]}`)
        
                if (info.enabled == true && info.commandInfo.adminCommand == false) {
                    helpMessage = `${helpMessage}\n${defaultPrefix}${info.commandInfo.name} | ${info.commandInfo.description} | ${defaultPrefix}${info.commandInfo.usage}`
                } else {
                    disabledCounter++
                }
            }

            helpMessage = helpMessage + `\nThere are ${disabledCounter} disabled commands`
            msg.channel.send(helpMessage)
        } else if (command[0].includes("eval")) {
            if (checkAdminStatus(msg.author.id)) {
                command = msg.content.split(" ");
                command.shift()

                var fullMessage = ""

                for (index = 0; index < command.length; index++) {
                    fullMessage = fullMessage + " " + command[index]
                }

                if (fullMessage) {
                    eval(fullMessage)
                }
            } else {
                msg.reply("You are not an admin...").then((sentMessage) => sentMessage.delete({timeout:10000}))
            }
        } else if (command[0].includes("reload")) {
            if (checkAdminStatus(msg.author.id)) {
                var files = fs.readdirSync("./commands");

                for (index = 0; index < files.length; index++) {
                    var info = importFresh(`./commands/${files[index]}`);

                    if (info.commandInfo.name == command[1]) {
                        console.log(`${msg.author.username} is reloading ${command[1]} (${msg.author.id})`)
                        if (cache[`./commands/${files[index]}`]) {
                            cache[`./commands/${files[index]}`] = importFresh(`./commands/${files[index]}`);
                        } else {
                            cache[`./commands/${files[index]}`] = importFresh(`./commands/${files[index]}`);
                        }

                        msg.channel.send(`Successfully re-cached \`${command[1]}\``)

                        return
                    }
                }
            }
        } else {
            var commandInfo = findCommand(command[0])

            if (commandInfo) {
                command.shift()
    
                if (commandInfo.enabled == false) {
                    msg.reply("This command is disabled!")
                    return
                }

                if (commandInfo.commandInfo.requireArgs == true && commandInfo.commandInfo.adminCommand == false) {
                    if (command.len > 0) {
                        commandInfo.function(command, msg)
                    } 
                } else if (commandInfo.commandInfo.adminCommand == true) {
                    if (checkAdminStatus(msg.author.id)) {
                        commandInfo.function(command, msg)
                    }
                } else {
                    commandInfo.function(command, msg)
                }
            }
        }
    }
})

client.login(process.env.TOKEN)