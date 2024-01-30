import { findAndUpdateUser, findUser } from '../../helpers/helpers.js';

async function logout(req, res, next) {
  const user = res.user;
  const searchUserInDB = await findUser({ _id: user._id }).lean();
  if (!searchUserInDB) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  await findAndUpdateUser({ _id: searchUserInDB._id }, { token: '' });
  return res.json({ message: 'No content' });
}

export { logout };