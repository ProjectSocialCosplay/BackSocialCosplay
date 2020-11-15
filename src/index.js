import {uuid} from "./utils/tools";

const dotenv = require('dotenv');
import cors from 'cors';
import express from 'express';
import {ApolloServer, ApolloError} from 'apollo-server-express';
import schemas from './schemas';
import resolvers from './resolvers';
const mongodbconfig = require('./config/db')
const jwt = require('./utils/jwt');
import userModel from './models/userModel';

dotenv.config({
    path: `./.env.${process.env.NODE_ENV}`
});

const app = express();
app.use(
    cors({
        credentials: true,
        origin:
            process.env.NODE_ENV === "production"
                ? process.env.FRONT_DOMAINE_NAME
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

mongodbconfig.moogoseConnect();
app.listen(process.env.PORT, () => {
    console.log(`🚀 Server listening on port ${process.env.PORT}`);
});
module.exports = app;