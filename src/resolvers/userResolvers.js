import {AuthenticationError} from 'apollo-server-express'
import bcrypt from "bcrypt"
import jwt from "../utils/jwt"

module.exports = {
    Query: {
        user: async (parent, {id}, {models: {userModel}, me}, info) => {
            console.log('parent: '+parent)
            console.log('id: '+id)
            console.log('userMOdel: ',userModel)
            console.log('me: ',me)

            if (!me) {
                throw new AuthenticationError('You are not authenticated');
            }
            return await userModel.findById({_id: id}).exec();
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
            if(!user._isAccountVerified){
                throw new AuthenticationError('Account not confirmed');
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