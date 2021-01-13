import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import {ApolloServer, ApolloError} from 'apollo-server-express'
import jwt from './utils/jwt';
import {uuid} from './utils/tools'
import mongodbconfig from './config/db'
import * as bodyParser from "body-parser";

import schemas from './schemas'
import resolvers from './resolvers'

import userModel from './models/userModel';
import postModel from './models/postModel';
import commentModel from './models/commentModel';
import likeModel from './models/likeModel';
import pictureModel from './models/pictureModel'

dotenv.config({
    path: `./.env.${process.env.NODE_ENV}`
});

const app = express();
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))

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
                    likeModel,
                    pictureModel,
                    commentModel
                },
                req
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