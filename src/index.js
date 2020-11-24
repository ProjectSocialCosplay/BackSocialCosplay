const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const {ApolloServer, ApolloError} = require('apollo-server-express');
const schemas = require('./schemas');
const resolvers = require('./resolvers');
const mongodbconfig = require('./config/db')
const jwt = require('./utils/jwt');
const {uuid} = require('./utils/tools')
const userModel = require('./models/userModel');
dotenv.config({
    path: `./.env.${process.env.NODE_ENV}`
});

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use(
    cors({
        credentials: true,
        origin:
            process.env.NODE_ENV === "production"
                ? process.env.DOMAINE_NAME
                : "http://localhost:"+process.env.PORT,
    })
);

const server = new ApolloServer({
    typeDefs: schemas,
    resolvers,
    context: async ({req})=>{
        if(req){
            const me = await jwt.checkUser(req)
            return {
                me,
                models: {
                    userModel
                }
            };
        }
    },
    formatError(err) {
        console.log(uuid() +": " + err.message)
        return {
            message: err.message,
        };
    }

});

server.applyMiddleware({app, path: '/graphql'});

mongodbconfig.moogoseConnect()

app.listen(process.env.PORT, () => {
    console.log(`🚀 Server listening on port ${process.env.PORT}`);
});


module.exports = {
    app,
    server
};