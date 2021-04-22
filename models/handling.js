const players = require("./mongoPlayers");
const { messages, texts, backpacktexts, achievementtexts } = require("./strings");
const { choices } = require("./choices");
const { achievements, backpack } = require("./storage");
const { app } = require("../app");

const handling = {
    homepageRequest: app.get("/", async function (request, response) {
        whyDead = [];
        achievements.clear();
        backpack.clear();
        stomach = [];
        response.render("index", {
            bootAnimation: true,
            message: messages.startMessage,
            link: "/introduction",
            showForm: true,
            //username error message component
            errorMessage: request.query.errorMessage,
            errorMessageText: messages.userNameError
        });
    }),
    basecampRequest: app.get("/basecamp", function (request, response) {
        if (achievements.has(' meet_Tommy'))
            response.render("index", {
                message: messages.basecampMessage + userName,
                text: texts.basecampText,
                achievementtexts: achievementtexts.achievementsContentsSubtext + Array.from(achievements),
                backpacktexts: backpacktexts.backpackContentsSubtext + Array.from(backpack),
                link: "/directory",
                fiveoptions: true,
                option1: choices.makeFire,
                option2: choices.findWater,
                option3: choices.makeFood,
                option4: choices.makeShelter,
                option5: choices.goBackToTommy
            });
        else if (achievements.has(' discover_ship'))
            response.render("index", {
                message: messages.basecampMessage + userName,
                text: texts.basecampText,
                achievementtexts: achievementtexts.achievementsContentsSubtext + Array.from(achievements),
                backpacktexts: backpacktexts.backpackContentsSubtext + Array.from(backpack),
                link: "/directory",
                fiveoptions: true,
                option1: choices.makeFire,
                option2: choices.findWater,
                option3: choices.makeFood,
                option4: choices.makeShelter,
                option5: choices.goBackToShip
            });
        else if (!achievements.has(' meet_Tommy') || !achievements.has('discover_ship'))
            response.render("index", {
                message: messages.basecampMessage + userName,
                text: texts.basecampText,
                achievementtexts: achievementtexts.achievementsContentsSubtext + Array.from(achievements),
                backpacktexts: backpacktexts.backpackContentsSubtext + Array.from(backpack),
                link: "/directory",
                fouroptions: true,
                option1: choices.makeFire,
                option2: choices.findWater,
                option3: choices.makeFood,
                option4: choices.makeShelter
            });
    }),
    gameOverRequest: app.get("/gameOver", function (request, response) {
        console.log('GAME OVER');
        response.render("index", {
            gameOver: true,
            option1: choices.playAgain,
            message: messages.gameOverMessage,
            text: whyDead,
            achievementtexts: achievementtexts.achievementsContentsSubtext + Array.from(achievements),
            backpacktexts: backpacktexts.backpackContentsSubtext + Array.from(backpack),
            link: "/directory",
        });
    })
};

exports.handling = handling;
