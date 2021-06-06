const {AuthenticationError} = 'apollo-server-express'

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
                follower: followerId,
            }).save();
            // Push follower/following to user collection
            await userModel.findOneAndUpdate({_id: follow.user}, {$push: {following: follow.id}});
            await userModel.findOneAndUpdate({_id: followerId}, {$push: {followers: follow.id}});

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
            await userModel.findOneAndUpdate({_id: follow.follower}, {$pull: {following: follow.id}});
            return follow;
        },

    },
    Follow: {
        user: async (following, args, {models: {userModel},userInfo}, info) => {
            return  await userModel.findOne({_id: following.user}).exec()
        },
        follower: async (follower, args, {models: {userModel}}, info) => {
            return await userModel.findOne({_id: follower.follower}).exec()
        },
    },
};