import {AuthenticationError} from 'apollo-server-express'

export default {
    Mutation: {
        /**
         * Creates a following/follower relationship between users
         *
         * @param {string} userId
         * @param {string} followerId
         */
        createFollow: async (parent, {followerId}, {models: {followModel, userModel}, userInfo}, info) => {
            if (!userInfo) {
                throw new AuthenticationError('You are not authenticated');
            }
            const follow = await new followModel({
                user: userInfo._id,
                following: followerId,
            }).save();
            // Push follower/following to user collection
            await userModel.findOneAndUpdate({_id: follow.user}, {$push: {followers: follow.id}});
            await userModel.findOneAndUpdate({_id: followerId}, {$push: {following: follow.id}});

            return follow;
        },

        /**
         * Deletes a following/follower relationship between users
         *
         * @param {string} id follow id
         */
        deleteFollow: async (parent, {id}, {models: {followModel, userModel}, userInfo}) => {
            if (!userInfo) {
                throw new AuthenticationError('You are not authenticated');
            }
            const follow = await followModel.findByIdAndRemove(id);

            // Delete follow from users collection
            await userModel.findOneAndUpdate({_id: follow.user}, {$pull: {followers: follow.id}});
            await userModel.findOneAndUpdate({_id: follow.following}, {$pull: {following: follow.id}});

            return follow;
        },

    },
    Follow: {
        user: async (follower, args, {models: {userModel},userInfo}, info) => {
            return await userModel.findOne({_id: follower.user}).exec()
        },
        following: async (following, args, {models: {userModel}}, info) => {
            console.log(following)
            return await userModel.findOne({_id: following.following}).exec()
        },
    },
};