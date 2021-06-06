"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var likeSchema = new _mongoose["default"].Schema({
  post: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Post'
  },
  author: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

var _default = _mongoose["default"].model('Like', likeSchema);

exports["default"] = _default;
//# sourceMappingURL=likeModel.js.map