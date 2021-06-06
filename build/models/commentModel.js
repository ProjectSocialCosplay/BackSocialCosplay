"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
var commentSchema = new _mongoose["default"].Schema({
  comment: {
    type: String,
    required: true,
    maxLength: [255, 'Comment is too long'],
    trim: true
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

var comment = _mongoose["default"].model('Comment', commentSchema);

var _default = comment;
exports["default"] = _default;
//# sourceMappingURL=commentModel.js.map