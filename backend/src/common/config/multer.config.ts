import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';

export const multerOptions = {
    storage: diskStorage({
        destination: (req: any, file: any, cb: any) => {
            const uploadPath = '../../../uploads';

            // Create folder if doesn't exist
            if (!existsSync(uploadPath)) {
                mkdirSync(uploadPath);
            }
            cb(null, uploadPath);
        },
    }),
};
