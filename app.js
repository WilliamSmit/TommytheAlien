// dependancies
const express = require('express');
const app = express();
exports.app = app;
const querystring = require('querystring');    
var path = require('path');

//app info
app.set("view engine", "pug");
app.set("views", path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//imports
const { messages, texts, backpacktexts, achievementtexts } = require("./models/strings");
const { images } = require("./models/images");
const { choices } = require("./models/choices");
const { achievements, backpack, existingPlayers} = require("./models/storage");
const players = require("./models/mongoPlayers");

//functions
function handling() {
    app.get("/", async function (request, response) {
        whyDead = [];
        achievements.clear();
        backpack.clear();
        stomach = [];
        globalThis.allPlayers = await players.listPlayers();
        allPlayers.forEach(_id => {existingPlayers.add((_id.userName))});
        response.render("index", {
            message: messages.startMessage,
            link: "/introduction",
            showForm: true,
            //username error message component
            errorMessage: request.query.errorMessage,
            errorMessageText: messages.userNameError
            });
    });

    app.post("/introduction", async function (request, response) {
        userName = request.body.userName;
        if (userName === undefined || userName === '' || userName.length > 14) {
            var query = querystring.stringify({ errorMessage: true });
            response.redirect("/?" + query);
        }
        else if (existingPlayers.has(userName))
            response.render("index", {
                message: messages.welcomeBackMessage + userName,
                text: texts.welcomebackText,
                link: "/directory",
                twooptions: true,
                option1: choices.ready,
                option2: choices.nvm
            })
        else if (!existingPlayers.has(userName))
            players.createPlayer(userName, 1) +
            response.render("index", {
                message: messages.welcomeMessage + userName,
                text: texts.welcomeText,
                link: "/directory",
                twooptions: true,
                option1: choices.ready,
                option2: choices.nvm
            })
    });
    app.get("/basecamp", function (request, response) {
        //console.log(existingPlayers)
        if (achievements.has(' meet_Tommy'))
            response.render("index", {
                message: messages.basecampMessage + userName,
                text: texts.basecampText,
                achievementtexts: achievementtexts.achievementsContentsSubtext + Array.from(achievements),
                backpacktexts: backpacktexts.backpackContentsSubtext + Array.from(backpack),
                link: "/directory",
                image: images.basecamp,
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
                image: images.basecamp,
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
                image: images.basecamp,
                fouroptions: true,
                option1: choices.makeFire,
                option2: choices.findWater,
                option3: choices.makeFood,
                option4: choices.makeShelter
            });
    });
    app.get("/gameOver", function (request, response) {
        console.log('GAME OVER');
        response.render("index", {
            message: messages.gameOverMessage,
            text: whyDead,
            achievementtexts: achievementtexts.achievementsContentsSubtext + Array.from(achievements),
            backpacktexts: backpacktexts.backpackContentsSubtext + Array.from(backpack),
            link: "/directory",
            oneoptions: true,
            option1: choices.playAgain
        });
    });
    app.post("/directory", function (request, response) {
        var playerResponse = request.body.playerChoice;
        console.log(playerResponse);
        if (playerResponse === choices.ready) {
            response.redirect("/basecamp")
        }
        else if (playerResponse === choices.nvm) {
            response.redirect("/")
        }
        else if (playerResponse === choices.makeFire) {
            response.redirect("/makeFire");
        }
        else if (playerResponse === choices.findWater) {
            response.redirect("/findWater");
        }
        else if (playerResponse === choices.makeFood) {
            response.redirect("/makeFood");
        }
        else if (playerResponse === choices.makeShelter) {
            response.redirect("/makeShelter");
        }
        else if (playerResponse === choices.chopWood) {
            response.redirect("/chopWood");
        }
        else if (playerResponse === choices.findWood) {
            response.redirect("/findWood");
        }
        else if (playerResponse === choices.returnToCamp) {
            response.redirect("/basecamp");
        }
        else if (playerResponse === choices.makeMoreFood && stomach.length <= 6) {
            response.redirect("/makeFood")
        }
        else if (playerResponse === choices.makeMoreFood && stomach.length > 6) {
            whyDead.push(`Who do you think you are, Abdu? You've eaten too much and died from the complications...`)
            response.redirect("/gameOver")
        }
        else if (playerResponse === choices.eatHotdog) {
            response.redirect("/eatHotdog");
        }
        else if (playerResponse === choices.eatGranola) {
            response.redirect("/eatGranola");
        }
        else if (playerResponse === choices.eatBerries) {
            response.redirect("/eatBerries");
        }
        else if (playerResponse === choices.goToSleep) {
            whyDead.push('You were eaten by a bear in your sleep...');
            response.redirect("/gameOver");
        }
        else if (playerResponse === choices.playAgain) {
            whyDead = [];
            achievements.clear();
            backpack.clear();
            stomach = [];
            response.redirect("/basecamp");
        }
        else if (playerResponse === choices.investigateGlow) {
            response.redirect("/investigateGlow");
        }
        else if (playerResponse === choices.lookInside) {
            response.redirect("/lookInside");
        }
        else if (playerResponse === choices.attackTheAlien) {
            whyDead.push(`Turns out Tommy knows karate... turns out you don't...`);
            response.redirect("/gameOver");
        }
        else if (playerResponse === choices.helpFixShip) {
            response.redirect("/helpFixShip");
        }
        else if (playerResponse === choices.offerFood) {
            response.redirect("/offerFood");
        }
        else if (playerResponse === choices.goBackToShip) {
            response.redirect("/investigateGlow");
        }
        else if (playerResponse === choices.goBackToTommy) {
            response.redirect("/lookInside");
        }
        else if (playerResponse === choices.runFromAlien) {
            achievements.add(' meet_Tommy');
            response.redirect("/basecamp");
        }
        else if (playerResponse === choices.doSomethingElse) {
            response.redirect('/lookInside');
        }
        else if (playerResponse === choices.makeFriends) {
            response.redirect("/makeFriends");
        }
        
    });
   
};
function getRequests() {
    //fire chain
    app.get("/makeFire", function (request, response) {
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
                image: images.fire,
                message: messages.makeFireMessage,
                text: texts.alreadyFireText,
                achievementtexts: achievementtexts.achievementsContentsSubtext + Array.from(achievements),
                backpacktexts: backpacktexts.backpackContentsSubtext + Array.from(backpack),
                oneoptions: true,
                option1: choices.returnToCamp
            });
        }
    });
    app.get("/chopWood", function (request, response) {
        backpack.add(" wood");
        achievements.add(' fire');
            response.render("index", {
            link: "/directory",
            image: images.fire,
            oneoptions: true,
            option1: choices.returnToCamp,
            message: messages.makeFireMessage,
            text: texts.yesFireText,
            achievementtexts: achievementtexts.achievementsContentsSubtext + Array.from(achievements),
            backpacktexts: backpacktexts.backpackContentsSubtext + Array.from(backpack)
            });
            
    });
    app.get("/findWood", function (request, response) {
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
    });

    //water chain
    app.get("/findWater", function (request, response) {
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
    });

    //food chain
    app.get("/makeFood", function (request, response) {
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
    });
    app.get("/eatHotdog", function (request, response) {
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
    });
    app.get("/eatGranola", function (request, response) {
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
    });
    app.get("/eatBerries", function (request, response) {
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
    });

    //shelter chain
    app.get("/makeShelter", function (request, response) {
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
    });

    //investigate chain=
    app.get("/investigateGlow", function (request, response) {
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
    });

    //alien meeting chain
    app.get("/lookInside", function (request, response) {
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
    });
    app.get("/helpFixShip", function (request, response) {
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
                text: `You stammer h- hi... I'm ${userName}. ${texts.helpFixShipText}`,
                achievementtexts: achievementtexts.achievementsContentsSubtext + Array.from(achievements),
                backpacktexts: backpacktexts.backpackContentsSubtext + Array.from(backpack),
                twooptions: true,
                option1: choices.offerFood,
                option2: choices.returnToCamp
            });
    });
    app.get("/offerFood", function (request, response) {
        achievements.add(' meet_Tommy');
        if (achievements.has(' fix_ship') && (backpack.has(' berries') || backpack.has(' hotdog') ||
            backpack.has(' granola_bar')))
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
                    text: `You stammer h- hi... I'm ${userName}. ${texts.offerFoodText + Array.from(backpack)
                        + texts.stillBrokenText}`,
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
    });
    app.get("/makeFriends", function (request, response) {
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
    });
};

//variables
var whyDead = [];
let userName = undefined;
let stomach = []

//app (in functions)
handling();
getRequests();

// port info
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));