import userResolvers from './userResolvers'
import postResolver  from "./postResolvers";
import likeResolvers from './likeResolvers';
import commentResolvers from './commentResolvers';
import pictureResolvers from "./pictureResolvers";
import eventResolvers from "./eventResolvers";

export default  [userResolvers, postResolver, commentResolvers, likeResolvers, pictureResolvers, eventResolvers];

