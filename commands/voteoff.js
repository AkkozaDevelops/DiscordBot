
function command(args, message) {
    var user = global.getUserFromMention(args[0])

    if (user) {
        if (user == message.author) {
            message.channel.send("You cannot vote yourself off, silly!")
        } else {
            var impostor = Math.floor(Math.random() * 100) + 1

            if (impostor < 80) {
                message.channel.send(`${user.username} has been voted off`).then((sentMessage) => {
                    var dots = 1

                    function loop() {
                        setTimeout(function() {
                            if (!(dots > 3)) {
                                var dotString = ""

                                for (dot = 0; dot < dots; dot++) {
                                    dotString = dotString + "."
                                }
                                dots++

                                sentMessage.edit(`${user.username} has been voted off${dotString}`)

                                loop()
                            } else {
                                sentMessage.edit(`${user.username} wasn't the impostor!`)
                            }
                        }, 1250)
                    }

                    loop()
                })
            } else {
                message.channel.send(`${user.username} has been voted off`).then((sentMessage) => {
                    var dots = 1

                    function loop() {
                        setTimeout(function() {
                            if (!(dots > 3)) {
                                var dotString = ""

                                for (dot = 0; dot < dots; dot++) {
                                    dotString = dotString + "."
                                }
                                dots++

                                sentMessage.edit(`${user.username} has been voted off${dotString}`)

                                loop()
                            } else {
                                sentMessage.edit(`${user.username} was the impostor!`)
                            }
                        }, 1250)
                    }

                    loop()
                })
            }
        }
    } else {
        message.channel.send("Please include a user.").then((botMessage) => botMessage.delete({timeout:12000}))
    }
}

module.exports = {
    "commandInfo" : {
        "name" : "voteimpostor",
        "description" : "Get your verified pp size.",
        "usage" : "voteimpostor <user>",

        "requiresArgs" : false,
        "adminCommand" : false
    },

    "enabled" : true,
    "function" : command,
};