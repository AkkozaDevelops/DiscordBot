
function command(args, message) {
    var fullMessage = ""

    for (index = 2; index < args.length; index++) {
        fullMessage = fullMessage + " " + args[index]
    }

    if (fullMessage == null) {
        return
    } else {
        global.client.user.setPresence({
            status: args[0],
            game: {
                name: fullMessage,
                type: args[1]
            }
        })
    }
}

module.exports = {
    "commandInfo" : {
        "name" : "setstatus",
        "description" : "this is a testing command",
        "usage" : "setstatus <status> <gameType> <gameName>",

        "requiresArgs" : true,
        "adminCommand" : true
    },

    "function" : command,
};