const db = require("./db")

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