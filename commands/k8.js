
function command(args, message) {
    message.channel.send("poggers")
}

module.exports = {
    "commandInfo" : {
        "name" : "k8",
        "description" : "this is a testing command",
        "usage" : "setstatus <status> <gameType> <gameName>",

        "requiresArgs" : true,
        "adminCommand" : true
    },

    "function" : command,
};