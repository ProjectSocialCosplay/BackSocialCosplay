const { gql } = require('apollo-server-express');
const  userSchema = require('./userSchema');
const postSchema = require('./postSchema');

const linkSchema = gql`
    scalar Date
    type Query {
        _: Boolean
    }
    type Mutation {
        _: Boolean
    }
`;

module.exports = [linkSchema, userSchema, postSchema];