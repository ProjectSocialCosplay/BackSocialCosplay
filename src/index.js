const cors = require('cors');
const express = require('express')
const {ApolloServer, ApolloError} = require('apollo-server-express')
const jwt = require('./utils/jwt');
const {uuid} = require('./utils/tools');
const {mongodbconfig} = require('./config/db');
const bodyParser = require("body-parser");
require('dotenv').config();
const schemas = require('./schemas');
const resolvers = require('./resolvers');

const userModel = require('./models/userModel');
const postModel = require('./models/postModel');
const commentModel = require('./models/commentModel');
const likeModel = require('./models/likeModel');
const pictureModel = require('./models/pictureModel');
const followModel = require('./models/followModel');


const app = express();
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))

app.use(
    cors({
        credentials: true,
        origin:
            process.env.NODE_ENV === "production"
                ? process.env.DOMAINE_NAME
                : "http://localhost:" + process.env.PORT,
    })
);

const server = new ApolloServer({
    typeDefs: schemas,
    resolvers,
    context: async ({req}) => {
        if (req) {
            const userInfo = await jwt.checkUser(req)
            return {
                userInfo,
                models: {
                    userModel,
                    postModel,
                    likeModel,
                    pictureModel,
                    commentModel,
                    followModel
                },
                req
            };
        }
    },
    formatError(err) {
        if (process.env.NODE_ENV !== require('test')) {
            console.log(uuid() + ": " + err.message)
        }
        return {
            // ErrorEventId: uuid(),
            message: err.message,
        };
    }

});

server.applyMiddleware({app, path: '/graphql'});

mongodbconfig.moogoseConnect()

const appServ = app.listen(process.env.PORT, () => {
        console.log(`🚀 App Launch Server listening on port ${process.env.PORT}`);
});

module.exports = {
    appServ,
    server
};