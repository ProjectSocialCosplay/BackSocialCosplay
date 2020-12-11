import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import express from 'express'
import {ApolloServer, ApolloError} from 'apollo-server-express'
import jwt from './utils/jwt';
import {uuid} from './utils/tools'
import mongodbconfig from './config/db'

import schemas from './schemas'
import resolvers from './resolvers'

import userModel from './models/userModel';
import postModel from './models/postModel';
import commentModel from './models/commentModel';

dotenv.config({
    path: `./.env.${process.env.NODE_ENV}`
});

const app = express();
//app.use(bodyParser.urlencoded({extended: false}));
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
            const userInfo = await jwt.checkUser(req)
            return {
                userInfo,
                models: {
                    userModel,
                    postModel,
                    commentModel,
                },
            };
        }
    },
    formatError(err) {
        if(process.env.NODE_ENV !=='test'){
            console.log(uuid() +": " + err.message)
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
    console.log(`🚀 Server listening on port ${process.env.PORT}`);
});

export {
    appServ,
    server
};