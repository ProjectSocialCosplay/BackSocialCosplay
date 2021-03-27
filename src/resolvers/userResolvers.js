import {AuthenticationError} from 'apollo-server-express'
import bcrypt from "bcrypt"
import jwt from "../utils/jwt"
import pictureModel from "../models/pictureModel";

export default {
    Query: {
        user: async (parent, {id}, {models: {userModel}, userInfo}, info) => {
            if (!userInfo) {
                throw new AuthenticationError('You are not authenticated');
            }
            return await userModel.findById({_id: id}).exec()
        },
        getAuthUser: async (parent, {id}, {models: {userModel}, userInfo}, info) => {
            if (!userInfo) {
                throw new AuthenticationError('You are not authenticated');
            }
            return await userModel.findById({_id: userInfo._id}).exec()
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
            /*
            if(!user._isAccountVerified){
                throw new AuthenticationError('Account not confirmed');
            }*/
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
    User: {
        posts: async ({id}, args, {models: {postModel}}, info) => {
            return await postModel.find({author: id}).exec();
        },
        comment: async ({id}, args, {models: {commentModel}}, info) => {
            return await commentModel.find({author: id}).exec();
        },
        profile_image: async (user, args, {models: {pictureModel}}, info) => {
            const data = await pictureModel.findOne({author: user._id, _id: user.profile_image_url}).exec();
            data.url = 'https://' + process.env.BUCKETNAME + '.s3.eu-central-1.amazonaws.com/users/avatars/' + data.key
            if(data) {
                return data
            }
        }
    },
};