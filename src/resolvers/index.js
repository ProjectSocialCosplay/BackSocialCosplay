import userResolvers from './userResolvers'
import postResolver  from "./postResolvers";
import likeResolvers from './likeResolvers';
import commentResolvers from './commentResolvers';
import pictureResolvers from "./pictureResolvers";
import followResolvers from "./followResolvers";

export default  [userResolvers, postResolver, commentResolvers, likeResolvers, pictureResolvers, followResolvers];

