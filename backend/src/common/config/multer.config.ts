import * as path from 'path';

export const createMulterOptions = (folderName: string) => {
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
};

export const storageOptionsForDelete = {
    keyFilename: path.join(__dirname, '../../../google-credentials.json')
}
