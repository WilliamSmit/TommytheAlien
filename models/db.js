const MongoClient = require('mongodb').MongoClient;

const dbUrl = 'mongodb://localhost:27017'
const databaseName = 'TTA-Players'

let connectMongoClient = MongoClient.connect(dbUrl, { useUnifiedTopology: true })
let getDb = connectMongoClient.then((client) => {
    return client.db(databaseName)
})

//db functions
function getCollection(name) {
    return getDb.then((db) => { return db.collection(name)})
}
function close() {
    return connectMongoClient.then((client) => {
        return client.close()
    })
}

//testing stuff
/*function updateCollection(name) {
    return getDb.then((db) => { return db.collection.updateOne("players")})
}*/



module.exports = {
    getDb,
    getCollection,
    close
}