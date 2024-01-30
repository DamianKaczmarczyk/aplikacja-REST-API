import { findContact } from '../../helpers/helpers.js';

export async function showContact(req, res, next) {
  const { contactId } = req.params;
  const user = res.user;
  try {
    const contact = await findContact(contactId, user);
    contact ? res.status(200).json(contact) : next();
  } catch (error) {
    next(error);
  }
}