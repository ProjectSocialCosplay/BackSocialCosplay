"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _userResolvers = _interopRequireDefault(require("./userResolvers"));

var _postResolvers = _interopRequireDefault(require("./postResolvers"));

var _likeResolvers = _interopRequireDefault(require("./likeResolvers"));

var _commentResolvers = _interopRequireDefault(require("./commentResolvers"));

var _pictureResolvers = _interopRequireDefault(require("./pictureResolvers"));

var _followResolvers = _interopRequireDefault(require("./followResolvers"));

var _default = [_userResolvers["default"], _postResolvers["default"], _commentResolvers["default"], _likeResolvers["default"], _pictureResolvers["default"], _followResolvers["default"]];
exports["default"] = _default;
//# sourceMappingURL=index.js.map