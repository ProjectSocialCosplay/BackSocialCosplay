import {gql} from 'apollo-server-express';
import userSchema from './userSchema';
import postSchema from './postSchema';
import pictureSchema from "./pictureSchema";
import likeSchema from './likeSchema';
import commentSchema from './commentSchema';

const linkSchema = gql`
    scalar Date
    
    type Query {    
        _: Boolean
    }
    type Mutation {
        _: Boolean
    }
`;

export default [linkSchema, userSchema, postSchema, pictureSchema, commentSchema, likeSchema];