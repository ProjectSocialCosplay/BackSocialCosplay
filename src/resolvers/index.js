const userResolvers = require( './userResolvers')
const postResolver  = require( "./postResolvers");
const likeResolvers = require( './likeResolvers');
const commentResolvers = require( './commentResolvers');
const pictureResolvers = require( "./pictureResolvers");
const followResolvers = require( "./followResolvers");


module.exports = {  userResolvers, postResolver, commentResolvers, likeResolvers, pictureResolvers, followResolvers};

