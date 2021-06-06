"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServerExpress = require("apollo-server-express");

var _templateObject;

var _default = (0, _apolloServerExpress.gql)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n    type Post {\n        _id: ID!\n        content: String!\n        author: User!\n        comment: [Comment]\n        likes: [Like]\n        updatedAt: Date\n    }\n\n    extend type Query {\n        # Get user Post\n        getPost(id: ID!): [Post]!\n\n        #Get User \n        getAllPost: [Post]!\n    }\n\n    extend type Mutation {\n        # Creates a new post\n        createPost(content: String!): Post!\n\n        # Deletes a user post\n        deletePost(id: ID!): Post\n    }\n"])));

exports["default"] = _default;
//# sourceMappingURL=postSchema.js.map