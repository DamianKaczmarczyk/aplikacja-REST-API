import { getAllContacts, findFavoriteContacts } from '../../helpers/helpers.js';

export async function indexContacts(req, res, next) {
  try {
    const user = res.user;
    const params = req.query;
    if (params.favorite) {
      const favoriteContacts = await findFavoriteContacts(user);
      return res.status(200).json(favoriteContacts);
    }
    const allContacts = await getAllContacts(user);
    return res.status(200).json(allContacts);
  } catch (error) {
    next(error);
  }
}