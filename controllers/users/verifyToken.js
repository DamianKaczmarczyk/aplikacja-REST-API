import { findUser } from '../../helpers/helpers.js';
import { findAndUpdateUser } from '../../helpers/helpers.js';

export async function verifyToken(req, res, next) {
  try {
    const token = req.params.verificationToken;
    const user = await findUser({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await findAndUpdateUser({ _id: user._id }, { verificationToken: '', verify: true });
    return res.status(200).json('Verification successful');
  } catch (error) {
    console.log(error);
    next(error);
  }
}