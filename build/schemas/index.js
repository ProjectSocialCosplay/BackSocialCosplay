"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServerExpress = require("apollo-server-express");

var _userSchema = _interopRequireDefault(require("./userSchema"));

var _postSchema = _interopRequireDefault(require("./postSchema"));

var _pictureSchema = _interopRequireDefault(require("./pictureSchema"));

var _likeSchema = _interopRequireDefault(require("./likeSchema"));

var _commentSchema = _interopRequireDefault(require("./commentSchema"));

var _followSchema = _interopRequireDefault(require("./followSchema"));

var _templateObject;

var linkSchema = (0, _apolloServerExpress.gql)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n    scalar Date\n    \n    type Query {    \n        _: Boolean\n    }\n    type Mutation {\n        _: Boolean\n    }\n"])));
var _default = [linkSchema, _userSchema["default"], _postSchema["default"], _pictureSchema["default"], _commentSchema["default"], _likeSchema["default"], _followSchema["default"]];
exports["default"] = _default;
//# sourceMappingURL=index.js.map