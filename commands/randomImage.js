
function command(args, message) {
    
}

module.exports = {
    "commandInfo" : {
        "name" : "sdaaa",
        "description" : "this is a testing command",
        "usage" : "setstatus <status> <gameType> <gameName>",

        "requiresArgs" : true,
        "adminCommand" : false
    },

    "enabled" : false,
    "function" : command,
};