"use strict";

var AWS = require('aws-sdk');

var _require = require('./../config/S3'),
    data = _require.data;

var _require2 = require('./../lib/s3Uploaders'),
    S3Uploader = _require2.S3Uploader;

AWS.config.update(data);
var s3 = new AWS.S3({
  accessKeyId: data.accessKeyId,
  secretAccessKey: data.secretAccessKey
});
var s3Uploader = new S3Uploader(s3, {
  /*
  uploadParams: {
     CacheControl: 'max-age:31536000',
     ContentDisposition: 'inline',
  },*/
}, data.Bucket);
module.exports = {
  uploader: s3Uploader
};
//# sourceMappingURL=AwsS3.js.map