const {gql} = require('apollo-server-express');
const {appServ, server} = require('../index')
const supertest = require("supertest");
const {connectToDb, closeDbConnection, removeAllCollections} = require("./test-setup-bdd");
const request = supertest(appServ)

const {userRegister, userAuth} = require('./auth.test')
const {post} = require('./post.test')
const {comment} = require('./comment.test')
const {follow} = require("./follow.test");

describe('Init Test', ()=>{

    // Connect to Mongoose
    beforeAll(async () => {
        await connectToDb()
        await removeAllCollections()
    })

    // Cleans up database between each test
    afterEach(async () => {
    })

    // Disconnect Mongoose
    afterAll(async () => {
        await closeDbConnection()
        appServ.close()
    })

    describe('User register', ()=>{userRegister(request)})
    describe('User Auth', ()=>{userAuth(request)})
    describe('Post', ()=>{post(request)})
    describe('Comment', ()=>{comment(request)})
    describe('Follow', ()=>{follow(request)})
})

