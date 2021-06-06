"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServerExpress = require("apollo-server-express");

var _templateObject;

var _default = (0, _apolloServerExpress.gql)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n\n  type Follow {\n    _id: ID!\n    user: User! #user suit  \n    follower: User!\n  }\n  \n  extend type Mutation {\n    createFollow( followerId: ID!): Follow\n    deleteFollow( id: ID!): Follow\n  }\n"])));

exports["default"] = _default;
//# sourceMappingURL=followSchema.js.map