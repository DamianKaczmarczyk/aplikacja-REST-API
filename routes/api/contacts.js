import express from 'express';
import { showContact } from '../../controllers/contacts/showContacts.js';
import { indexContacts } from '../../controllers/contacts/indexContacts.js';
import { createContact } from '../../controllers/contacts/createContacts.js';
import { deleteContact } from '../../controllers/contacts/deleteContacts.js';
import { updateContacts } from '../../controllers/contacts/updateContacts.js';
import { updateStatusContact } from '../../controllers/contacts/updateStatusContact.js';

const contactsRouter = express.Router();

contactsRouter.get('/', indexContacts);
contactsRouter.post('/', createContact);
contactsRouter.get('/:contactId', showContact);
contactsRouter.put('/:contactId', updateContacts);
contactsRouter.delete('/:contactId', deleteContact);
contactsRouter.patch('/:contactId/favorite', updateStatusContact);

export { contactsRouter };