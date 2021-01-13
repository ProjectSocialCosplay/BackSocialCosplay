/**
 * generate filename
 * */
function uuidFilenameTransform() {
    return `${Date.now() + ((Math.random() * 100000).toFixed())}`;
}

class S3Uploader {
    constructor(s3, config, bucket) {
        const {
            uploadParams = {},
            concurrencyOptions = {},

        } = config;

        this._bucket = bucket
        this._s3 = s3;
        this._filenameTransform = uuidFilenameTransform();
        this._uploadParams = uploadParams;
        this._concurrencyOptions = concurrencyOptions;
    }

    /**
     * @param {string} base64 image
     * @params {string} basekey AWS folder
     * */
    async upload(file, baseKey) {
        const buffer = new Buffer(file, 'base64');

        const params = {
            Bucket: this._bucket,
            Key: `${baseKey}/${this._filenameTransform}`,
            Body: buffer,
            ContentType: 'image/jpeg'
        }

        try {
            let data = await this._s3.upload(params).promise()
            const res = data.key.replace(baseKey + '/', "");
            console.log(data)
            return {key: res}
        } catch (err) {
            console.log(err)
            return err
        }
    }

    /**
     * @param {string} base64 image
     * @params {string} basekey AWS folder
     * */
    async deleteObject(fileName, baseKey) {

        const params = {
            Bucket: this._bucket,
            Key: `${baseKey}/${fileName}`
        };

        try {
            let data = this._s3.deleteObject(params)
            console.log(data)
            return data
        } catch (err) {
            console.log(err)
            return err
        }

    }
}

module.exports = {S3Uploader};