import {AuthenticationError} from 'apollo-server-express'
import bcrypt from "bcrypt"
import jwt from "../utils/jwt"
import {uploadFiles} from "../utils/azureStorage";
import likeModel from "../models/likeModel";


export default {
    Query: {
        user: async (parent, {id}, {models: {userModel}, userInfo}, info) => {
            if (!userInfo) {
                throw new AuthenticationError('You are not authenticated');
            }
            return await userModel.findById({_id: id}).sort({updatedAt: -1}).exec()
        },
        getAuthUser: async (parent, {id}, {models: {userModel}, userInfo}, info) => {
            if (!userInfo) {
                throw new AuthenticationError('You are not authenticated');
            }
            return await userModel.findById({_id: userInfo._id}).sort({updatedAt: -1}).exec()
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
        createUser: async (parent, {pseudo, email, password, birthdate, profile_image_url}, {models: {userModel}}, info) => {
            // TODO debug result
            if(profile_image_url){

                try{
                    const uplaodImage = await uploadFiles(profile_image_url, 'profile_image')
                    console.log(uplaodImage)
                    /*
                    if(!uplaodImage.secureURL){
                        throw new Error("Something went wrong while uploading image")
                    }
                    */
                }catch (e){
                    console.log(e)
                    throw new Error("Something went wrong while uploading image")
                }
            }
            return await userModel.create({pseudo, email, password, birthdate, profile_image_url});
        },
    },
    User: {
        posts: async ({id}, args, {models: {postModel}}, info) => {
            return await postModel.find({author: id}).sort({updatedAt: -1}).exec();
        },
        comment: async ({id}, args, {models: {commentModel}}, info) => {
            return await commentModel.find({author: id}).sort({updatedAt: -1}).exec();
        },
        likes: async ({id}, args, {models: {likeModel}}, info) => {
            return await likeModel.find({author: id}).sort({updatedAt: -1}).exec();
        },
    },
};
