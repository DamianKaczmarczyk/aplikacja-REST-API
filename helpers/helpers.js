import { Contact } from '../models/schemas/contact.js';
import { User } from '../models/schemas/user.js';

const getAllContacts = user => Contact.find({ owner: user._id });
const findAndDeleteContact = (id, user) => Contact.findOneAndDelete({ _id: id, owner: user._id });
const addNewContact = contact => Contact.create(contact);
const findContact = (id, user) => Contact.findOne({ _id: id, owner: user._id });
const findAndUpdateContact = (id, user, updateField) =>
  Contact.findOneAndUpdate({ _id: id, owner: user._id }, updateField, { new: true });
const findFavoriteContacts = user => Contact.find({ owner: user._id, favorite: true });

const findUser = filter => User.findOne(filter);
const findAndUpdateUser = (filter, updateField) =>
  User.findOneAndUpdate(filter, updateField, { new: true });

export {
  findUser,
  getAllContacts,
  findAndDeleteContact,
  addNewContact,
  findContact,
  findAndUpdateContact,
  findAndUpdateUser,
  findFavoriteContacts,
};