
function command(args, message) {
    var fullMessage = ""

    for (index = 0; index < args.length; index++) {
        fullMessage = fullMessage + " " + args[index]
    }

    if (fullMessage == null) {
        return
    } else {
        message.channel.send(fullMessage)
    }
}

module.exports = {
    "commandInfo" : {
        "name" : "say",
        "description" : "DEVELOPER COMMAND | Make the bot say said message.",
        "usage" : "say <message>",

        "requiresArgs" : true,
        "adminCommand" : true
    },

    "function" : command,
};