const { Storage } = require('@google-cloud/storage');
const storage = new Storage();
const bucketName = 'cloud_computing_project1';

const bucket = storage.bucket(bucketName);

const uploadToGCS = (file) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject('No file to upload.');
        }

        const blob = bucket.file(file.originalname);
        const blobStream = blob.createWriteStream();

        blobStream.on('error', (err) => reject(err));
        blobStream.on('finish', () => {
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            resolve(publicUrl);
        });

        blobStream.end(file.buffer);
    });
};

module.exports = {
    uploadToGCS,
};