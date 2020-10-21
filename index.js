const Discord = require('discord.js');
const client = new Discord.Client();

var prefix = "!mushroom"

const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config();

// push globals

global.fs = fs;
global.client = client;

// ------------

// functions

function findCommand(command) {
    var files = fs.readdirSync("./commands");

    for (index = 0; index < files.length; index++) {
        var info = require(`./commands/${files[index]}`)

        if (info.commandInfo.name == command) {
            return info
        }
    }

    return false
}

function checkAdminStatus(userId) {
    var admins = require("./admins.json")

    for (index = 0; index < admins.length; index++) {
        if (userId == admins[index]) {
            return true
        }
    }

    return false
}

// ---------

client.on('ready', () => {
    console.log("booted.")
})
 
client.on("message", msg => {
    if (msg.content.toLowerCase().startsWith(prefix) && !(msg.author == client)) {
        var command = msg.content.toLowerCase()
        command = command.split(" ");
        command.shift()

        if (command[0] == "help") {
            var helpMessage = ""
            var files = fs.readdirSync("./commands");

            for (index = 0; index < files.length; index++) {
                var info = require(`./commands/${files[index]}`)
        
                helpMessage = `${helpMessage}\n${info.commandInfo.name} | ${info.commandInfo.description} | ${info.commandInfo.usage}`
            }

            msg.channel.send(helpMessage)
        } else {
            var commandInfo = findCommand(command[0])

            if (commandInfo) {
                command.shift()
    
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