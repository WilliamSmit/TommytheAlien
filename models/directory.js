const { choices } = require("./choices");
const { achievements, backpack, stomach } = require("./storage");
const { app } = require("../app");

const directory = {
    directory: app.post("/directory", function (request, response) {
        var playerResponse = request.body.playerChoice;
        console.log(playerResponse);
        if (playerResponse === choices.ready) {
            response.redirect("/basecamp");
        }
        else if (playerResponse === choices.nvm) {
            response.redirect("/");
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
            response.redirect("/makeFood");
        }
        else if (playerResponse === choices.makeMoreFood && stomach.length > 6) {
            whyDead.push(`Who do you think you are, Abdu? You've eaten too much and died from the complications...`);
            response.redirect("/gameOver");
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
            whyDead.length = 0
            achievements.clear();
            backpack.clear();
            stomach.length = 0
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

    })
};

exports.directory = directory;
