
var cooldownTime = 5

var cooldowns = {}

function getPic() {
    var files = global.fs.readdirSync(global.dirname + "/assets/monikaPics")

    return global.dirname + "/assets/monikaPics/" + files[Math.floor(Math.random() * files.length)]
}

function command(args, message) {
    if (cooldowns[message.author.id] && cooldowns[message.author.id].oncooldown == true) {
        var time = new Date();
        var ms = time.getTime()

        message.channel.send(`This command is on cooldown for another ${Math.floor((cooldowns[message.author.id].endTime-ms)/1000)} second(s)`).then((botMessage) => botMessage.delete({timeout:12000}))
    } else {
        var time = new Date();
        var ms = time.getTime()

        cooldowns[message.author.id] = {"oncooldown":true, "endTime":(ms+cooldownTime*1000)};

        message.channel.send(`${message.author.username}, here you go!`, {files: [
            getPic()
        ]})

        setTimeout(function() {
            cooldowns[message.author.id] = {
                "oncooldown" : false
            }
        }, cooldownTime * 1000)
    }
}

module.exports = {
    "commandInfo" : {
        "name" : "monika",
        "description" : "this is a testing command",
        "usage" : "setstatus <status> <gameType> <gameName>",

        "requiresArgs" : false,
        "adminCommand" : false
    },

    "enabled" : true,
    "function" : command,
};