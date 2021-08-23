import * as path from 'path';

export const createMulterOptions = (folderName: string) => {
    return {
        projectId: 'tetramatyka',
        bucket: 'tetramatyka',
        keyFilename: path.join(__dirname, '../../../google-credentials.json'),
        filename: (req, file, cb) => {
            cb(null, `${folderName}/${Date.now()}-${file.originalname}`);
        },
        uniformBucketLevelAccess: false
    }
};

export const storageOptionsForDelete = {
    keyFilename: path.join(__dirname, '../../../google-credentials.json')
}
