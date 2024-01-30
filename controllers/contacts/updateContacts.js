import { findAndUpdateContact } from '../../helpers/helpers.js';

export async function updateContacts(req, res, next) {
  const { contactId } = req.params;
  const user = res.user;
  try {
    const body = req.body;
    const isBodyEmpty = Object.keys(body).length === 0;
    if (isBodyEmpty) {
      return res.status(400).json({ message: 'Missing fields' });
    }
    const updatedContact = await findAndUpdateContact(contactId, user, body);
    updatedContact !== null ? res.status(200).json(updatedContact) : next();
  } catch (error) {
    next(error);
  }
}