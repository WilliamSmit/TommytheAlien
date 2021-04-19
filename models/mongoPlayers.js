const db = require("./db")

//async mongo functions
async function createPlayer(userName, gamesPlayed) {
    let playerToCreate = {userName, gamesPlayed}
    let playerCollection = await db.getCollection("players")
    let insertResult = await playerCollection.insertOne(playerToCreate)
    return insertResult.ops[0]._id
}
async function listPlayers() {
    let playerCollection = await db.getCollection("players")
    let playerList = playerCollection.find({})
    return playerList.toArray()
}

module.exports = {
    createPlayer,
    listPlayers,
}

//shit that isnt working
/*db.getCollection('players').update({"userName" : userName}, 
                                    {"userName": userName, "gamesPlayed" : +1}, 
                                     {"multi" : false, "upsert" : false}
    );*/
/*
async function updateGames(gamesPlayed) {
    let playerToUpdate = await db.collection.updateOne("players")
    return playerToUpdate.ops
}*/
