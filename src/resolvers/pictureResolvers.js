const {uploader} = require("../utils/AwsS3.js");
const {AuthenticationError} = require('apollo-server-express')

export default {

    Mutation: {
        uploadProfileImage: async (parent, {base64str}, {models: {userModel, pictureModel}, userInfo}, info) => {
            if (!userInfo) {
                throw new AuthenticationError('You are not authenticated');
            }
            const alwreadyExist = await pictureModel.find({author: userInfo._id})
            if (alwreadyExist) {
                //delete From bucket
                let data = await uploader.deleteObject(alwreadyExist.key, 'users/avatars')
                if (data) {
                    try {
                        await pictureModel.find({author: userInfo._id}).deleteMany();
                    } catch (e) {
                        console.log(e.message)
                        throw new Error('Error Update Profile')
                    }
                }
            }

            let data = await uploader.upload(base64str, 'users/avatars')
            if (data) {
                const pictureRes = await pictureModel.create({key: data.key, author: userInfo._id});
                await userModel.updateOne({_id: pictureRes.author}, {profile_image_url: pictureRes._id})
                    .catch((e) => {
                        throw new Error(e.message)
                    })
                let user = await userModel.findOne({_id: userInfo._id}).exec()
                console.log(user)
                return {'key': data.key}
            }
        }
    }
};