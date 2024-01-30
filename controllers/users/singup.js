import { findUser } from '../../helpers/helpers.js';
import { User } from '../../models/schemas/user.js';
import { validateUser } from '../../models/validateUser.js';

export async function signup(req, res, next) {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const { error } = await validateUser(email, password);
    if (error) {
      return res.status(400).json({ message: error });
    }

    const sameEmail = await findUser({ email }).lean();
    if (sameEmail) {
      return res.status(409).json({ message: 'Email in use' });
    }

    const newUser = new User({ email });
    newUser.setPassword(password);
    await newUser.save();
    return res.status(201).json({ user: { email, subscription: newUser.subscription } });
  } catch (error) {
    next(error);
  }
}