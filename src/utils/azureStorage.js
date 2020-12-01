import 'regenerator-runtime/runtime'

const {BlobServiceClient} = require('@azure/storage-blob');
const blobSasUrl = 'BlobEndpoint=https://cosplaystockage.blob.core.windows.net/;QueueEndpoint=https://cosplaystockage.queue.core.windows.net/;FileEndpoint=https://cosplaystockage.file.core.windows.net/;TableEndpoint=https://cosplaystockage.table.core.windows.net/;SharedAccessSignature=sv=2019-12-12&ss=b&srt=co&sp=rwdcx&se=2020-11-26T17:06:20Z&st=2020-11-26T09:06:20Z&spr=https&sig=1Q07sVW9KC3oRLvkasEHn5WIww6gm4g4UWsZPeChFog%3D';
const blobServiceClient = new BlobServiceClient(blobSasUrl);


/**
 *  Uploads file to Cloudinary CDN
 *
 *  @param {fileInput} object, image streaming content
 *  @param {folder} string, folder name, where to save image
 */
const uploadFiles = async (fileInput, folder) => {
    try {
        const containerClient = blobServiceClient.getContainerClient(folder);
        const promises = [];

        for (const file of fileInput.files) {
            const blockBlobClient = containerClient.getBlockBlobClient(file.name);
            promises.push(blockBlobClient.uploadBrowserData(file));
        }
        return await Promise.all(promises);
    } catch (error) {
        return error.message
    }
}

export {
    uploadFiles
};