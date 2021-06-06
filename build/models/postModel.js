"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var postSchema = new _mongoose["default"].Schema({
  content: {
    type: String,
    required: true,
    trim: true,
    maxLength: [255, 'Post is too long']
  },
  author: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  likes: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Like'
  }]
}, {
  timestamps: true
});

var post = _mongoose["default"].model('Post', postSchema);

var _default = post;
exports["default"] = _default;
//# sourceMappingURL=postModel.js.map