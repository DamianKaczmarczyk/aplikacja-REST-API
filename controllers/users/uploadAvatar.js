import Jimp from 'jimp';
import { promises } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

import { id } from '#middleware/avatarsMiddleware.js';
import { findAndUpdateUser } from '#helpers/helpers.js';

export async function uploadAvatar(req, res, next) {
  const { _id } = res.user;
  try {
    const { path: oldPath, originalname } = req.file;
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const extension = path.extname(originalname);
    const photo = await Jimp.read(oldPath);
    const avatarsPath = __dirname + `../../../public/avatars/${id}${extension}`;
    if (!photo || !extension) {
      return res.status(404).json({ message: 'There is no photo, try again' });
    }
    photo
      .resize(250, 250, async () => {
        await promises.rename(oldPath, avatarsPath);
      })
      .write(avatarsPath);

    await findAndUpdateUser({ _id }, { avatarURL: avatarsPath });
    return res.status(200).json({ avatarURL: avatarsPath });
  } catch (error) {
    console.log(error);
    next(error);
  }
}