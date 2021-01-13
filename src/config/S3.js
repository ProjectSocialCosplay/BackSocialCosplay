import dotenv from "dotenv";

dotenv.config({
    path: `./.env.${process.env.NODE_ENV}`
});


const data = {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    Bucket: process.env.BUCKETNAME,
    region: process.env.AWS_REGION
}

export {
    data
}