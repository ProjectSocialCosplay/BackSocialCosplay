import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import express from 'express'
import {ApolloServer, ApolloError} from 'apollo-server-express'
import schemas from './schemas'
import resolvers from './resolvers'
import mongodbconfig from './config/db'
import jwt from './utils/jwt';
import {uuid} from './utils/tools'
import userModel from './models/userModel';

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
      //  console.log(uuid() +": " + err.message)
        return {
            message: err.message,
        };
    }

});

server.applyMiddleware({app, path: '/graphql'});

mongodbconfig.moogoseConnect()

let appServ = app.listen(process.env.PORT, () => {
    console.log(`🚀 Server listening on port ${process.env.PORT}`);
});

export {
    appServ,
    server
};