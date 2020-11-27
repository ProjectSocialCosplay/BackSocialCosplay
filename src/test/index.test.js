const {gql} = require('apollo-server-express');
const {appServ, server} = require('../index')
const supertest = require("supertest");
const {connectToDb, closeDbConnection, removeAllCollections} = require("./test-setup");

const {setupDB} = require('./test-setup')
const request = supertest(appServ)
const {userRegister, userAuth} = require('./auth.test')
const {postDescription} = require('./post.test')

describe('Init Test', ()=>{

    // Connect to Mongoose
    beforeAll(async () => {
        await connectToDb()
        await removeAllCollections()
    })

    // Cleans up database between each test
    afterEach(async () => {
        await removeAllCollections()
        appServ.close()
    })

    // Disconnect Mongoose
    afterAll(async () => {
        await closeDbConnection()
        appServ.close()
    })

    describe('User register', ()=>{userRegister(request)})
    describe('User Auth', ()=>{userAuth(request)})
    describe('PostDescription', ()=>{postDescription(request)})

})

