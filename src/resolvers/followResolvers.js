import {AuthenticationError} from 'apollo-server-express'
export default {
    Mutation: {
    /**
     * Creates a following/follower relationship between users
     *
     * @param {string} userId
     * @param {string} followerId
     */
    createFollow: async (parent, { userId, followerId}, {models: { followModel, userModel }, userInfo}, info) => {
        if (!userInfo) {
            const follow = await new followModel({
                user: userId,
                follower: followerId,
            }).save();

            // Push follower/following to user collection
            await userModel.findOneAndUpdate({_id: userId}, {$push: {followers: follow.id}});
            await userModel.findOneAndUpdate({_id: followerId}, {$push: {following: follow.id}});

            return follow;
        }
    },

    /**
     * Deletes a following/follower relationship between users
     *
     * @param {string} id follow id
     */
    deleteFollow: async (parent, { id }, {models: { followModel, userModel }, userInfo}) => {
        if (!userInfo) {
            const follow = await followModel.findByIdAndRemove(id);

            // Delete follow from users collection
            await userModel.findOneAndUpdate({_id: follow.user}, {$pull: {followers: follow.id}});
            await userModel.findOneAndUpdate({_id: follow.follower}, {$pull: {following: follow.id}});

            return follow;
        }
    }}
};