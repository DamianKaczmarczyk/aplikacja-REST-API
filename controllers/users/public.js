import path from 'path';
import { promises } from 'fs';

const publicPath = path.join(process.cwd(), 'public');
const mainPath = path.join(publicPath, 'avatars');
export const temporaryPath = path.join(publicPath, 'avatars-temp');

async function isFolderExists(path) {
  return await promises
    .access(path)
    .then(() => true)
    .catch(() => false);
}

async function createFolder(isExists, path) {
  if (!isExists) {
    return await promises.mkdir(path);
  }
}

export async function checkOrCreatePublic() {
  try {
    const isPublicPathExists = await isFolderExists(publicPath);
    const isTempFolderExists = await isFolderExists(temporaryPath);
    const isMainFolderExists = await isFolderExists(mainPath);

    createFolder(isPublicPathExists, publicPath);
    createFolder(isTempFolderExists, temporaryPath);
    createFolder(isMainFolderExists, mainPath);
  } catch (error) {
    console.log(error);
  }
}