const gql =  require('apollo-server-express');
const userSchema =  require('./userSchema');
const postSchema =  require('./postSchema');
const pictureSchema =  require ('./pictureSchema');
const likeSchema =  require('./likeSchema');
const commentSchema =  require('./commentSchema');
const followSchema =  require('./followSchema');

const linkSchema = gql`
    scalar Date
    
    type Query {    
        _: Boolean
    }
    type Mutation {
        _: Boolean
    }
`;

const test = ()=>{
    return [linkSchema, userSchema, postSchema, pictureSchema, commentSchema, likeSchema, followSchema]
}
module.exports = {
    test
}