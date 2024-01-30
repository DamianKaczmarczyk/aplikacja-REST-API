import { addNewContact } from '../../helpers/helpers.js';

export async function createContact(req, res, next) {
  try {
    const user = res.user;
    const { name, email } = req.body;
    const newContact = await addNewContact({ name, email, owner: user._id });
    newContact ? res.status(201).json(newContact) : next();
  } catch (error) {
    next(error);
  }
}