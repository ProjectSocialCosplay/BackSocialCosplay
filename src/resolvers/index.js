import userResolvers from './userResolvers'
import postResolver  from "./postResolvers";
import likeResolvers from './likeResolvers';
import commentResolvers from './commentResolvers';

export default  [userResolvers, postResolver, commentResolvers, likeResolvers];

