const {AuthenticationError} = require('apollo-server-express')
const {bcrypt} = require("bcrypt");
const {jwt} = require("../utils/jwt");

module.exports =  {
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
        searchUsers: async (parent, { searchQuery }, { models: {userModel},userInfo}) => {
            if (!userInfo) {
                throw new AuthenticationError('You are not authenticated');
            }
            if (!searchQuery) {
                return [];
            }
            return userModel.find({
                $or: [{pseudo: new RegExp(searchQuery, 'i')}],
                _id: {
                    $ne: userInfo._id,
                },
            }).limit(50);
        },
    },
    Mutation: {
        createUser: async (parent, {pseudo, email, password, birthdate}, {models: {userModel}}, info) => {
            return await userModel.create({pseudo, email, password, birthdate});
        },
        updateUser: async (parent, {pseudo, email, birthdate}, {models: {userModel}, userInfo}, info) => {
            if (!userInfo) {
                throw new AuthenticationError('You are not authenticated');
            }
            let testUpdate = await userModel.findOneAndUpdate({_id: userInfo._id}, {
                    pseudo: pseudo,
                    email: email,
                    birthdate: birthdate
                },
                (err, result) => {
                    if (err) {
                        throw new Error("User not updated")
                    } else {
                        return (result)
                    }
                })
            return testUpdate;
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
            if (data) {
                data.url = 'https://' + process.env.BUCKETNAME + '.s3.eu-central-1.amazonaws.com/users/avatars/' + data.key
                return data
            }
            return null
        },
        followers: async (user, args, {models: {followModel}}, info) => {
            return await followModel.find({follower: user._id}).exec()
        },
        following: async (user, args, {models: {followModel}}, info) => {
            return await followModel.find({_id: user.following}).exec()
        },
        feed: async (user, args, {models: {followModel, postModel}, userInfo}, info) => {
            let data = await followModel.find({_id: user.following}).exec()
            let res = await postModel.find({author: userInfo._id}).sort({createdAt: -1})
            if (data.length > 0) {
                res = res.concat(await postModel.find({author: {$in: data[0].follower}}).sort({createdAt: -1}))
            }
            return res.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1)
        },
    },
};