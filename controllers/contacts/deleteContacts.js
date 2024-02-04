import { findAndDeleteContact } from '../../helpers/helpers.js';

export async function deleteContact(req, res, next) {
  const { contactId } = req.params;
  const user = res.user;
  try {
    const contact = await findAndDeleteContact(contactId, user);
    contact ? res.status(200).json({ message: 'Contact deleted' }) : next();
  } catch (error) {
    next(error);
  }
}