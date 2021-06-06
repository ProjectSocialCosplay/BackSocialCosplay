"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
/**
 * Follow schema that has references to User schema
 */

var followSchema = new _mongoose["default"].Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  follower: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

var _default = _mongoose["default"].model('Follow', followSchema);

exports["default"] = _default;
//# sourceMappingURL=followModel.js.map