"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
var pictureSchema = Schema({
  key: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  tags: {
    type: String
  },
  author: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

var _default = _mongoose["default"].model('Picture', pictureSchema);

exports["default"] = _default;
//# sourceMappingURL=pictureModel.js.map