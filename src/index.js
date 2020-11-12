const dotenv = require('dotenv');
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import {ApolloServer, AuthenticationError} from 'apollo-server-express';

import schemas from './schemas';
import resolvers from './resolvers';

dotenv.config({
    path: `./.env.${process.env.NODE_ENV}`
});

const app = express();
app.use(cors());

const server = new ApolloServer({
    typeDefs: schemas,
    resolvers,
});

server.applyMiddleware({app, path: '/graphql'});

app.listen(process.env.PORT, () => {
    mongoose.connect(process.env.MONGODB_URI);
    console.log(`🚀 Server listening on port ${process.env.PORT}`);
});