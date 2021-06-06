const userResolvers = require( './userResolvers')
const postResolver  = require( "./postResolvers");
const likeResolvers = require( './likeResolvers');
const commentResolvers = require( './commentResolvers');
const pictureResolvers = require( "./pictureResolvers");
const followResolvers = require( "./followResolvers");

export default  [userResolvers, postResolver, commentResolvers, likeResolvers, pictureResolvers, followResolvers];

