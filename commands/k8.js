
function command(args, message) {
    message.channel.send("pogchamp")
}

module.exports = {
    "commandInfo" : {
        "name" : "fuckunux",
        "description" : "this is a testing command",
        "usage" : "setstatus <status> <gameType> <gameName>",

        "requiresArgs" : true,
        "adminCommand" : true
    },

    "enabled" : true,
    "function" : command,
};