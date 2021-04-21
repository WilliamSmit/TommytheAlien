const db = require("./db")

//unused atm
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

//async mongo functions
async function openSession(userName) {
    let player = null
    let playerCollection = await db.getCollection("players")
    let cursor = playerCollection.find({})
    let playerList = await cursor.toArray()
    player = playerList.find(elem=>elem.userName===userName)
    if (player) {
        playerCollection.updateOne(
            { userName },
            { $set: { gamesPlayed : player.gamesPlayed +1 }}
        )
    }
    else {
        playerCollection.insertOne({userName, gamesPlayed: 0})
    }
    return !player
}

module.exports = {
    createPlayer,
    listPlayers,
    openSession
}