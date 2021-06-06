"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServerExpress = require("apollo-server-express");

var _templateObject;

var _default = (0, _apolloServerExpress.gql)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n    type Comment {\n        _id: ID!\n        comment: String!\n        post: Post!\n        createdAt: Date!\n        like: [Like]\n        author: User!\n    }\n\n    type deleteComment {\n        message: String!\n    }\n\n    extend type Query {\n        # Get user Comment\n        getComment(id: ID!): [Comment]!\n\n    }\n    extend type Mutation {\n        createComment(comment: String!, postId: ID! ): Comment\n        deleteComment(commentId: ID!): deleteComment\n    }\n"])));

exports["default"] = _default;
//# sourceMappingURL=commentSchema.js.map