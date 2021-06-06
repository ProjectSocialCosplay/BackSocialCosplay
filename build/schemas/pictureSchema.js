"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServerExpress = require("apollo-server-express");

var _templateObject;

var _default = (0, _apolloServerExpress.gql)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n\n    type Picture{\n        key: String!,\n        url: String!,\n        description: String,\n        tags: String,\n        author: User\n    }\n    \n    extend type Mutation {\n        uploadProfileImage(base64str: String): Picture\n    }\n"])));

exports["default"] = _default;
//# sourceMappingURL=pictureSchema.js.map