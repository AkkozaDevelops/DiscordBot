
function command(args, message) {
    var user = global.getUserFromMention(args[0])

    if (user) {
        if (user == message.author) {
            message.channel.send("Its sweet that you love yourself, but please tag another user :flushed:")
        } else {
            var impostor = Math.floor(Math.random() * 100) + 1

            if (impostor < 60) {
                message.channel.send(`${user.username} loves you.`).then((sentMessage) => {
                    var loops = 1
                    var love = true;

                    function loop() {
                        setTimeout(function() {
                            if (!(loops > 5)) {
                                loops++

                                if (love == true) {
                                    sentMessage.edit(`${user.username} loves you not.`)
                                    love = false;
                                } else {
                                    sentMessage.edit(`${user.username} loves you.`)
                                    love = true;
                                }
                                

                                loop()
                            }
                        }, 1250)
                    }

                    loop()
                })
            } else {
                message.channel.send(`${user.username} loves you.`).then((sentMessage) => {
                    var loops = 1
                    var love = true;

                    function loop() {
                        setTimeout(function() {
                            if (!(loops > 6)) {
                                loops++

                                if (love == true) {
                                    sentMessage.edit(`${user.username} loves you not.`)
                                    love = false;
                                } else {
                                    sentMessage.edit(`${user.username} loves you.`)
                                    love = true;
                                }
                                

                                loop()
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
        "name" : "love",
        "description" : "Get your verified pp size.",
        "usage" : "voteimpostor <user>",

        "requiresArgs" : false,
        "adminCommand" : false
    },

    "enabled" : true,
    "function" : command,
};