const mongoose = require('mongoose')
const { createTestClient } = require('apollo-server-testing');
mongoose.set('useCreateIndex', true)
mongoose.promise = global.Promise

let db;
const connectToDb = async () => {
    db = await mongoose.connect(process.env.DB_URL, {
         useUnifiedTopology: true,
         useNewUrlParser: true,
         useCreateIndex: true
    }).then(() => console.log('connected to db')).catch(err => console.log('MongoDB error when connecting:' + err));
}
const dropTestDb = async () => {
    const collections = Object.keys(mongoose.connection.collections)
    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName]
        try {
            await collection.drop()
        } catch (error) {
            // Sometimes this error happens, but you can safely ignore it
            if (error.message === 'ns not found') return
            // This error occurs when you use it
            // safely ignore this error too
            if (error.message.includes('a background operation is currently running')) return
            console.log(error.message)
        }
    }
}
const  removeAllCollections =  async () => {
    const collections = Object.keys(mongoose.connection.collections)
    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName]
        await collection.deleteMany()
    }
}
const closeDbConnection = async () => {
    await mongoose.connection.close().catch(error => console.error(error));
    await db.close();
}


module.exports = {
    connectToDb,
    closeDbConnection,
    dropTestDb,
    removeAllCollections
}