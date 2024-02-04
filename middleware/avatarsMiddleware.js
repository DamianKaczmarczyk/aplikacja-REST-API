import path from 'path';
import multer from 'multer';
import shortid from 'shortid';

import { temporaryPath } from '../controllers/users/public.js';

export const id = shortid.generate();
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.tif', '.svg', '.webp'];
const imageMimetype = ['image/jpeg', 'image/png', ' image/gif', 'image/svg+xml'];

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, temporaryPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${id}-${file.originalname}`);
  },
});

export const upload = multer({
  storage: storage,
  fileFilter: async (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const mimetype = file.mimetype;
    if (imageExtensions.includes(extension) && imageMimetype.includes(mimetype)) {
      return cb(null, true);
    }
    return cb(null, false);
  },
  limits: {
    fileSize: 8 * 1024 * 1024,
  },
});