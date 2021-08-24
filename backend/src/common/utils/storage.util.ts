import * as Storage from '@google-cloud/storage';
import * as path from 'path';

const storageOptionsShort = {
    keyFilename: path.join(__dirname, '../../../google-credentials.json')
}

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

    removeFile: async (folderName: string, fileUrl: string) => {
        const shortUrlIndex = fileUrl.indexOf(`/${folderName}`);
        const shortUrl = fileUrl.slice(shortUrlIndex);
        const storage = new Storage(storageOptionsShort);
        await storage.bucket('tetramatyka').file(shortUrl).delete();
    },

    generateV4ReadSignedUrl: async (folderName: string, fileUrl: string) => {
        const shortUrlIndex = fileUrl.indexOf(`/${folderName}`);
        const shortUrl = fileUrl.slice(shortUrlIndex);
        const options = {
            version: 'v4',
            action: 'read',
            expires: Date.now() + 3 * 60 * 1000,
        };

        const storage = new Storage(storageOptionsShort);
        const [url] = await storage
            .bucket('tetramatyka')
            .file(shortUrl)
            .getSignedUrl(options);

        return url;
    }
}
