const AWS = require('aws-sdk');
const { data } = require('./../config/S3');
const {
    S3Uploader
} = require('./../lib/s3Uploaders');

AWS.config.update(data);

const s3 = new AWS.S3({
    accessKeyId: data.accessKeyId,
    secretAccessKey: data.secretAccessKey
});

const s3Uploader = new S3Uploader(s3, {
    /*
    uploadParams: {
       CacheControl: 'max-age:31536000',
       ContentDisposition: 'inline',
    },*/
}, data.Bucket);

module.exports = { uploader: s3Uploader };
//# sourceMappingURL=AwsS3.js.map