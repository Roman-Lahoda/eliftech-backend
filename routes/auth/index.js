import { Router } from 'express';
import { signup, login, logout } from '../../controllers/auth/index.js';
import guard from '../../middlewares/guard.js';
import { validateCreateUser } from '../../middlewares/validateUser.js';

const router = Router();

router.post('/signup', validateCreateUser, signup);
router.post('/login', login);
router.post('/logout', guard, logout);

export default router;
