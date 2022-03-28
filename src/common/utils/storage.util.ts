import * as Storage from '@google-cloud/storage';
import * as path from 'path';

const storageOptionsShort = {
    keyFilename: path.join(__dirname, '../../../google-credentials.json')
}

const authorizedStorageUrl = 'https://storage.cloud.google.com/tetramatyka';

export const storageUtil = {
    createMulterOptions: (folderName: string) => {
        return {
            projectId: 'tetramatyka',
            bucket: 'tetramatyka',
            keyFilename: path.join(__dirname, '../../../google-credentials.json'),
            filename: (req, file, cb) => {
                const archiveYear = req.query.year;
                cb(null, `${archiveYear}/${folderName}/${Date.now()}-${file.originalname}`);
            },
            uniformBucketLevelAccess: false
        }
    },

    removeFile: async (fileUrl: string) => {
        const shortUrl = fileUrl.slice(authorizedStorageUrl.length - 1);
        const storage = new Storage(storageOptionsShort);
        await storage.bucket('tetramatyka').file(shortUrl).delete();
    },

    generateV4ReadSignedUrl: async (fileUrl: string, seconds?: number) => {
        const shortUrl = fileUrl.slice(authorizedStorageUrl.length - 1);
        const timeSec = seconds || 60;
        const options = {
            version: 'v4',
            action: 'read',
            expires: Date.now() + timeSec * 1000,
        };
        const storage = new Storage(storageOptionsShort);
        const [url] = await storage
            .bucket('tetramatyka')
            .file(shortUrl)
            .getSignedUrl(options);

        return url;
    }
}
