
const splashes = [

    {
        "min" : 0,
        "max" : 0,
        "texts" : [
            "what am i suppose to be looking at?"
        ]
    },

    {
        "min" : 1,
        "max" : 5,
        "texts" : [
            "this loser has a tiny pp!",
            "look at this shrimp!!!"
        ]
    },

    {
        "min" : 6,
        "max" : 12,
        "texts" : [
            "not too bad, bro. :wink:",
            "nice and girthy, not too big, not too small."
        ]
    },

    {
        "min" : 13,
        "max" : 16,
        "texts" : [
            "jesus christ?? where did u get that massive bulgy wulgy :flushed:",
            "nice cock."
        ]
    },

    {
        "min" : 17,
        "max" : 19,
        "texts" : [
            "bruh."
        ]
    },

    {
        "min" : 20,
        "max" : 900,
        "texts" : [
            "THAT THING IS HUGE??!"
        ]
    }

]

var cooldownTime = 30

var cooldowns = {}

function getSplash(size) {
    for (index = 0; index < splashes.length; index++) {
        if (splashes[index].min <= size && splashes[index].max >= size) {
            return splashes[index].texts[Math.floor(Math.random() * splashes[index].texts.length)]
        }
    }
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

        var pp = Math.floor(Math.random() * 26)
        var vag = Math.floor(Math.random() * 1000) + 1
        var splash = getSplash(pp)

        var ppText = "8"
    
        if (message.author.id == 399416615742996480) {
            pp = 0
            splash = "colt you fucking suck lol"
        }

        for (index = 0; index < pp; index++) {
            ppText = ppText + "="
        }
    
        ppText = ppText + ">"

        if (vag < 10) {
            ppText = "{()}"
            splash = "that ain't even a dick?"
        }
    
        message.channel.send(`${message.author.username}'(s) pp is this big\n${ppText}\n${splash}`)
    
        setTimeout(function() {
            cooldowns[message.author.id] = {
                "oncooldown" : false
            }
        }, cooldownTime * 1000)
    }
}

module.exports = {
    "commandInfo" : {
        "name" : "ppsizeinator",
        "description" : "Get your verified pp size.",
        "usage" : "ppsizeinator",

        "requiresArgs" : false,
        "adminCommand" : false
    },

    "enabled" : true,
    "function" : command,
};