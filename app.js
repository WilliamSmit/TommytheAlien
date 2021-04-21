// dependancies
const express = require('express');
const app = express();
const querystring = require('querystring');    
const players = require("./models/mongoPlayers");
var path = require('path');
exports.app = app;

//app info
app.set("view engine", "pug");
app.set("views", path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//imports
const { messages, texts } = require("./models/strings");
const { choices } = require("./models/choices");
const { requests } = require("./models/requests");                  
const { directory } = require("./models/directory");
const { handling } = require("./models/handling");

//app
app.post("/introduction", async function (request, response) {
    userName = request.body.userName;
    if (userName === undefined || userName === '' || userName.length > 14) {
        var query = querystring.stringify({ errorMessage: true });
            response.redirect("/?" + query);
    }
    else {
        const isFirst = await players.openSession(userName)
        const checkAll = await players.listPlayers()
        let gameNumber = [];
        for(var i=0; i<checkAll.length; i++) {
            if(checkAll[i].userName === userName) {
            gameNumber.push(checkAll[i].gamesPlayed)
            }
        }
        response.render("index", {
            message: messages.welcomeMessage + userName,
            text: texts[isFirst? "welcomeText" : "welcomeBackText"],
            gamesPlayedTexts: `You have played ${gameNumber} games!`,
            link: "/directory",
            twooptions: true,
            option1: choices.ready,
            option2: choices.nvm
        })
    }
});
directory;
handling;
requests;

// port info
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));