const {gql} = require('apollo-server-express');
const {app, server} = require('../index')
const supertest = require("supertest");
const {connectToDb, closeDbConnection, removeAllCollections} = require("./test-setup");

const {setupDB} = require('./test-setup')
const request = supertest(app)
const {userRegister, userAuth} = require('./auth.test')
const {postDescription} = require('./post.test')

describe('Init Test', ()=>{

// Connect to Mongoose
    beforeAll(async () => {
        await connectToDb()
    })

// Cleans up database between each test
    afterEach(async () => {
    })

// Disconnect Mongoose
    afterAll(async () => {
        await removeAllCollections()
        await closeDbConnection()
    })

    describe('User register', userRegister(request))
    describe('User Auth', userAuth(request))
    describe('PostDescription', postDescription(request))

})

