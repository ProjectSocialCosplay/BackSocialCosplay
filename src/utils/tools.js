/**
 * This function generate uusi for log id
 * */
module.exports.uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * This function check if base64 is picture
 * */
module.exports.typeCheck = async (content) => {
    let {mimetype} = await content;
    return mimetype === "image/png" || mimetype === "image/jpeg";
}