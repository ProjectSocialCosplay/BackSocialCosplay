"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.data = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var data = {
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  Bucket: process.env.BUCKETNAME,
  region: process.env.AWS_REGION
};
exports.data = data;
//# sourceMappingURL=S3.js.map