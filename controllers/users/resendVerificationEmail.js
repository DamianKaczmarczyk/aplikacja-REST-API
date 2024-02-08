import { findUser } from './../../helpers/helpers.js';
import { sendEmail } from './sendEmail.js';

export async function resendVerificationEmail(req, res, next) {
  const { email } = req.body;
  const isBodyEmpty = Object.keys(req.body).length === 0;
  try {
    if (isBodyEmpty) {
      return res.status(400).json({ message: 'Missing fields' });
    }
    if (!email) {
      return res.status(400).json({ message: 'Missing required field email' });
    }
    const user = await findUser({ email });
    if (!user) {
      return res.status(400).json({ message: 'The email is incorrect, please try again.' });
    }
    if (user.verify) {
      return res.status(400).json({ message: 'Verification has already been passed' });
    }
    sendEmail(email, user.verificationToken);
    return res.status(200).json('Verification email sent');
  } catch (error) {
    console.log(error);
    next(error);
  }
}