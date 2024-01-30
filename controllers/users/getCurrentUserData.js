import { findUser } from '../../helpers/helpers.js';

export async function getCurrentUserData(req, res, next) {
  const user = res.user;
  const searchUserInDB = await findUser({ _id: user._id }).lean();
  if (!searchUserInDB) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  return res.status(200).json({ email: user.email, subscription: user.subscription });
}