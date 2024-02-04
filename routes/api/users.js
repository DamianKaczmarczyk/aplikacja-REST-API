import express from 'express';

import { login } from '../../controllers/users/login.js';
import { signup } from '../../controllers/users/singup.js';
import { logout } from '../../controllers/users/logout.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';
import { getCurrentUserData } from '../../controllers/users/getCurrentUserData.js';
import { uploadAvatar } from '../../controllers/users/uploadAvatar.js';
import { upload } from '../../middleware/avatarsMiddleware.js';

const usersRouter = express.Router();

usersRouter.post('/signup', signup);
usersRouter.post('/login', login);
usersRouter.get('/logout', authMiddleware, logout);
usersRouter.get('/current', authMiddleware, getCurrentUserData);
usersRouter.post('/avatars', authMiddleware, upload.single('avatar'), uploadAvatar);

export { usersRouter };