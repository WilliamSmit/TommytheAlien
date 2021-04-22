const { messages, texts, backpacktexts, achievementtexts } = require("./strings");
const { choices } = require("./choices");
const { achievements, backpack, whyDead, stomach } = require("./storage");
const { app } = require("../app");

const requests = {
    makeFireRequest: app.get("/makeFire", function (request, response) {
        if (!backpack.has(' wood') && achievements.has(' discover_ship')) {
            response.render("index", {
                link: "/directory",
                message: messages.lookingForWoodMessage,
                text: texts.noWoodText,
                achievementtexts: achievementtexts.achievementsContentsSubtext + Array.from(achievements),
                backpacktexts: backpacktexts.backpackContentsSubtext + Array.from(backpack),
                twooptions: true,
                option1: choices.chopWood,
                option2: choices.returnToCamp
            });
        }
        else if (!backpack.has(' wood')) {
            response.render("index", {
                link: "/directory",
                message: messages.lookingForWoodMessage,
                text: texts.noWoodText,
                achievementtexts: achievementtexts.achievementsContentsSubtext + Array.from(achievements),
                backpacktexts: backpacktexts.backpackContentsSubtext + Array.from(backpack),
                threeoptions: true,
                option1: choices.chopWood,
                option2: choices.findWood,
                option3: choices.returnToCamp
            });
        }
        else if (backpack.has(' wood')) {
            achievements.add(' fire');
            response.render("index", {
                link: "/directory",
                message: messages.makeFireMessage,
                text: texts.alreadyFireText,
                achievementtexts: achievementtexts.achievementsContentsSubtext + Array.from(achievements),
                backpacktexts: backpacktexts.backpackContentsSubtext + Array.from(backpack),
                oneoptions: true,
                option1: choices.returnToCamp
            });
        }
    }),
    chopWoodRequest: app.get("/chopWood", function (request, response) {
        backpack.add(" wood");
        achievements.add(' fire');
        response.render("index", {
            link: "/directory",
            oneoptions: true,
            option1: choices.returnToCamp,
            message: messages.makeFireMessage,
            text: texts.yesFireText,
            achievementtexts: achievementtexts.achievementsContentsSubtext + Array.from(achievements),
            backpacktexts: backpacktexts.backpackContentsSubtext + Array.from(backpack)
        });

    }),
    findWoodRequest: app.get("/findWood", function (request, response) {
        response.render("index", {
            link: "/directory",
            message: messages.lookingForWoodMessage,
            text: texts.woodSearchText,
            achievementtexts: achievementtexts.achievementsContentsSubtext + Array.from(achievements),
            backpacktexts: backpacktexts.backpackContentsSubtext + Array.from(backpack),
            twooptions: true,
            option1: choices.investigateGlow,
            option2: choices.returnToCamp
        });
    }),
    findWaterRequest: app.get("/findWater", function (request, response) {
        if (!achievements.has(' discover_ship'))
            response.render("index", {
                link: "/directory",
                message: messages.lookForWaterMessage,
                text: texts.waterSearchText,
                achievementtexts: achievementtexts.achievementsContentsSubtext + Array.from(achievements),
                backpacktexts: backpacktexts.backpackContentsSubtext + Array.from(backpack),
                twooptions: true,
                option1: choices.investigateGlow,
                option2: choices.returnToCamp
            });
        else if (achievements.has(' discover_ship'))
            response.render("index", {
                link: "/directory",
                message: messages.lookForWaterMessage,
                text: texts.alreadyWaterText,
                achievementtexts: achievementtexts.achievementsContentsSubtext + Array.from(achievements),
                backpacktexts: backpacktexts.backpackContentsSubtext + Array.from(backpack),
                oneoptions: true,
                option1: choices.returnToCamp,
            });
    }),
    makeFoodRequest: app.get("/makeFood", function (request, response) {
        if (!achievements.has(' discover_ship'))
            response.render("index", {
                link: "/directory",
                message: messages.makeFoodMessage,
                text: texts.makeFoodText,
                achievementtexts: achievementtexts.achievementsContentsSubtext + Array.from(achievements),
                backpacktexts: backpacktexts.backpackContentsSubtext + Array.from(backpack),
                fouroptions: true,
                option1: choices.eatHotdog,
                option2: choices.eatGranola,
                option3: choices.eatBerries,
                option4: choices.returnToCamp
            });
        else if (achievements.has(' discover_ship'))
            response.render("index", {
                link: "/directory",
                message: messages.makeFoodMessage,
                text: texts.makeFoodText,
                achievementtexts: achievementtexts.achievementsContentsSubtext + Array.from(achievements),
                backpacktexts: backpacktexts.backpackContentsSubtext + Array.from(backpack),
                threeoptions: true,
                option1: choices.eatHotdog,
                option2: choices.eatGranola,
                option3: choices.returnToCamp
            });
    }),
    eatHotdogRequest: app.get("/eatHotdog", function (request, response) {
        if (achievements.has(' fire')) {
            stomach.push(' hotdog');
            backpack.add(' hotdog');
            response.render("index", {
                link: "/directory",
                message: messages.makeFoodMessage,
                text: texts.cookHotdogText,
                achievementtexts: achievementtexts.achievementsContentsSubtext + Array.from(achievements),
                backpacktexts: backpacktexts.backpackContentsSubtext + Array.from(backpack),
                twooptions: true,
                option1: choices.makeMoreFood,
                option2: choices.returnToCamp
            });
        }
        else if (!achievements.has(' fire'))
            response.render("index", {
                link: "/directory",
                message: messages.makeFoodMessage,
                text: texts.noFire,
                achievementtexts: achievementtexts.achievementsContentsSubtext + Array.from(achievements),
                backpacktexts: backpacktexts.backpackContentsSubtext + Array.from(backpack),
                twooptions: true,
                option1: choices.makeFire,
                option2: choices.makeMoreFood
            });
    }),
    eatGranolaRequest: app.get("/eatGranola", function (request, response) {
        backpack.add(' granola_bar');
        stomach.push(' granola_bar');
        response.render("index", {
            link: "/directory",
            message: messages.makeFoodMessage,
            text: texts.eatGranolaText,
            twooptions: true,
            option1: choices.makeMoreFood,
            option2: choices.returnToCamp
        });
    }),
    eatBerriesRequest: app.get("/eatBerries", function (request, response) {
        backpack.add(' berries');
        stomach.push(' berries');
        response.render("index", {
            link: "/directory",
            message: messages.makeFoodMessage,
            text: texts.eatBerriesText,
            achievementtexts: achievementtexts.achievementsContentsSubtext + Array.from(achievements),
            backpacktexts: backpacktexts.backpackContentsSubtext + Array.from(backpack),
            twooptions: true,
            option1: choices.investigateGlow,
            option2: choices.returnToCamp
        });
    }),
    makeShelterRequest: app.get("/makeShelter", function (request, response) {
        if (!achievements.has(' shelter')) {
            achievements.add(' shelter');
            response.render("index", {
                link: "/directory",
                message: messages.makeShelterMessage,
                text: texts.pitchTentText,
                achievementtexts: achievementtexts.achievementsContentsSubtext + Array.from(achievements),
                backpacktexts: backpacktexts.backpackContentsSubtext + Array.from(backpack),
                twooptions: true,
                option1: choices.goToSleep,
                option2: choices.returnToCamp
            });
        }
        else if (achievements.has(' shelter'))
            response.render("index", {
                link: "/directory",
                message: messages.makeShelterMessage,
                text: texts.alreadyShelterText,
                achievementtexts: achievementtexts.achievementsContentsSubtext + Array.from(achievements),
                backpacktexts: backpacktexts.backpackContentsSubtext + Array.from(backpack),
                oneoptions: true,
                option1: choices.returnToCamp,
            });
    }),
    investigateGlowRequest: app.get("/investigateGlow", function (request, response) {
        achievements.add(' discover_ship');
        response.render("index", {
            link: "/directory",
            message: messages.investigateGlowMessage,
            text: texts.investigateGlowText,
            achievementtexts: achievementtexts.achievementsContentsSubtext + Array.from(achievements),
            backpacktexts: backpacktexts.backpackContentsSubtext + Array.from(backpack),
            twooptions: true,
            option1: choices.lookInside,
            option2: choices.returnToCamp
        });
    }),
    lookInsideRequest: app.get("/lookInside", function (request, response) {
        if (!achievements.has(' meet_Tommy'))
            response.render("index", {
                link: "/directory",
                message: messages.lookInsideMessage,
                text: texts.lookInsideText,
                achievementtexts: achievementtexts.achievementsContentsSubtext + Array.from(achievements),
                backpacktexts: backpacktexts.backpackContentsSubtext + Array.from(backpack),
                fouroptions: true,
                option1: choices.attackTheAlien,
                option2: choices.helpFixShip,
                option3: choices.offerFood,
                option4: choices.runFromAlien
            });
        else if (achievements.has(' fix_ship'))
            response.render("index", {
                link: "/directory",
                message: messages.lookInsideMessage,
                text: texts.alreadyMetText,
                achievementtexts: achievementtexts.achievementsContentsSubtext + Array.from(achievements),
                backpacktexts: backpacktexts.backpackContentsSubtext + Array.from(backpack),
                threeoptions: true,
                option1: choices.attackTheAlien,
                option2: choices.offerFood,
                option3: choices.runFromAlien
            });
        else if (achievements.has(' meet_Tommy'))
            response.render("index", {
                link: "/directory",
                message: messages.lookInsideMessage,
                text: texts.alreadyMetText,
                achievementtexts: achievementtexts.achievementsContentsSubtext + Array.from(achievements),
                backpacktexts: backpacktexts.backpackContentsSubtext + Array.from(backpack),
                fouroptions: true,
                option1: choices.attackTheAlien,
                option2: choices.helpFixShip,
                option3: choices.offerFood,
                option4: choices.runFromAlien
            });
    }),
    helpFixShipRequest: app.get("/helpFixShip", function (request, response) {
        achievements.add(' meet_Tommy');
        achievements.add(' fix_ship');
        if (achievements.has(' feed_Tommy'))
            response.render("index", {
                link: "/directory",
                message: messages.fixingShipMessage,
                text: texts.fixedThanksText,
                achievementtexts: achievementtexts.achievementsContentsSubtext + Array.from(achievements),
                backpacktexts: backpacktexts.backpackContentsSubtext + Array.from(backpack),
                oneoptions: true,
                option1: choices.makeFriends
            });
        else if (!achievements.has(' feed_Tommy'))
            response.render("index", {
                link: "/directory",
                message: messages.fixingShipMessage,
                text: `You stammer h- hi... I'm ${userName} ${texts.helpFixShipText}`,
                achievementtexts: achievementtexts.achievementsContentsSubtext + Array.from(achievements),
                backpacktexts: backpacktexts.backpackContentsSubtext + Array.from(backpack),
                twooptions: true,
                option1: choices.offerFood,
                option2: choices.returnToCamp
            });
    }),
    offerFoodRequest: app.get("/offerFood", function (request, response) {
        achievements.add(' meet_Tommy');
        if (achievements.has(' fix_ship') && (backpack.has(' berries') || backpack.has(' hotdog') || backpack.has(' granola_bar')))
            achievements.add(' feed_Tommy') +
                response.render("index", {
                    link: "/directory",
                    message: messages.offerFoodMessage,
                    text: `You tell him you have: ${Array.from(backpack)} . ${texts.stillHungryText}`,
                    achievementtexts: achievementtexts.achievementsContentsSubtext + Array.from(achievements),
                    backpacktexts: backpacktexts.backpackContentsSubtext + Array.from(backpack),
                    oneoptions: true,
                    option1: choices.makeFriends
                });
        else if (backpack.has(' berries') || backpack.has(' hotdog') || backpack.has(' granola_bar'))
            achievements.add(' feed_Tommy') +
                response.render("index", {
                    link: "/directory",
                    message: messages.offerFoodMessage,
                    text: `You stammer h- hi... I'm ${userName}. ${texts.offerFoodText + Array.from(backpack) + texts.stillBrokenText}`,
                    achievementtexts: achievementtexts.achievementsContentsSubtext + Array.from(achievements),
                    backpacktexts: backpacktexts.backpackContentsSubtext + Array.from(backpack),
                    twooptions: true,
                    option1: choices.helpFixShip,
                    option2: choices.returnToCamp
                });
        else if (!backpack.has(' berries') || !backpack.has(' hotdog') || !backpack.has(' granola_bar'))
            response.render("index", {
                link: "/directory",
                message: messages.noFoodMessage,
                text: texts.noFoodText,
                achievementtexts: achievementtexts.achievementsContentsSubtext + Array.from(achievements),
                backpacktexts: backpacktexts.backpackContentsSubtext + Array.from(backpack),
                twooptions: true,
                option1: choices.doSomethingElse,
                option2: choices.returnToCamp
            });
    }),
    makeFriendsRequest: app.get("/makeFriends", function (request, response) {
        achievements.add(' make_a_friend');
        response.render("index", {
            link: "/directory",
            message: messages.thankYouMessage,
            text: texts.bestFriendsText,
            achievementtexts: achievementtexts.achievementsContentsSubtext + Array.from(achievements),
            backpacktexts: backpacktexts.backpackContentsSubtext + Array.from(backpack),
            oneoptions: true,
            option1: choices.playAgain
        });
    }) 
};

exports.requests = requests;
