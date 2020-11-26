const { gql } = require('apollo-server-express');

import userSchema from './userSchema';
import postSchema from './postSchema';

const linkSchema = gql`
    scalar Date
    type Query {
        _: Boolean
    }
    type Mutation {
        _: Boolean
    }
`;

export default [linkSchema, userSchema, postSchema];