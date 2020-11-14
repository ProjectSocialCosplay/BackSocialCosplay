/*   extend type Query {
        user(id: ID!): User!
        login(email: String!, password: String!): Token!
   }
   extend type Mutation {
        createUser(email: String!, password: String!): User!
   }


*/
import {AuthenticationError} from 'apollo-server-express';
import * as bcrypt from "bcrypt";
import * as jwt from "../utils/jwt";

export default {
    Query: {
        user: async (parent, {id}, {models: {userModel}, me}, info) => {
            console.log('parent: '+parent)
            console.log('id: '+id)
            console.log('userMOdel: ',userModel)
            console.log('me: ',me)

            if (!me) {
                throw new AuthenticationError('You are not authenticated');
            }
            const user = await userModel.findById({_id: id}).exec();
            return user;
        },
        login: async (parent, {email, password}, {models: {userModel}}, info) => {
            const user = await userModel.findOne({email}).exec();
            if (!user) {
                throw new AuthenticationError('Invalid credentials');
            }
            const matchPasswords = bcrypt.compareSync(password, user.password);
            if (!matchPasswords) {
                throw new AuthenticationError('Invalid credentials');
            }

            const token = jwt.genarateToken(user._id)
            return {
                token
            };
        },
    },
    Mutation: {
        createUser: async (parent, {pseudo, email, password, birthdate}, {models: {userModel}}, info) => {

            return await userModel.create({pseudo, email, password, birthdate});
        },
   },
    /*
    User: {
        posts: async ({id}, args, {models: {postModel}}, info) => {
            const posts = await postModel.find({author: id}).exec();
            return posts;
        },
    },*/
};