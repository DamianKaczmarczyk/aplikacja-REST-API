import { findAndUpdateContact } from '../../helpers/helpers.js';

export async function updateStatusContact(req, res, next) {
  const { contactId } = req.params;
  const user = res.user;
  try {
    const body = req.body;
    const isBodyEmpty = Object.keys(body).length === 0;
    if (isBodyEmpty) {
      return res.status(400).json({ message: 'Missing field favorite' });
    }
    const addStatus = await findAndUpdateContact(contactId, user, body);
    addStatus ? res.status(200).json(addStatus) : next();
  } catch (error) {
    next(error);
  }
}