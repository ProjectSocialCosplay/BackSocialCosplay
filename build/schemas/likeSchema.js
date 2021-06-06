"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServerExpress = require("apollo-server-express");

var _templateObject;

var _default = (0, _apolloServerExpress.gql)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n    type Like {\n        _id: ID!\n        post: Post!\n        author: User!\n    }\n\n    extend type Query {\n        # Get user Like\n        like(id: ID!): [Like]!\n\n        #Get User Likes\n        likes: [Like]!\n    }\n\n\n    extend type Mutation {\n        createLike(postId: ID!): Like\n        deleteLike(postId: ID!): Like\n    }\n"])));

exports["default"] = _default;
//# sourceMappingURL=likeSchema.js.map