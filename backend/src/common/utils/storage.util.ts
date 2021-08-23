import * as Storage from '@google-cloud/storage';
import { storageOptionsForDelete } from '../config/multer.config';

export const storageUtil = {
    removeFile: async (folderName, fileUrl) => {
        const shortUrlIndex = fileUrl.indexOf(`/${folderName}`);
        const shortUrl = fileUrl.slice(shortUrlIndex);
        const storage = new Storage({...storageOptionsForDelete});
        await storage.bucket('tetramatyka').file(shortUrl).delete();
    }
}
