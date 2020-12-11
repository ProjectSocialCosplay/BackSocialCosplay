const { gql } = require('apollo-server');
import userSchema from './userSchema';
import postSchema from './postSchema';
import photoSchema from "./photoSchema";
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

export default [linkSchema, userSchema, postSchema, photoSchema, commentSchema, likeSchema];