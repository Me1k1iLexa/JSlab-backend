import { Router } from 'express';
import { register, login, authMe } from '../controllers/auth.controller'
import { authMiddleware } from '../middleware/authMiddleware'
const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/me',authMiddleware, authMe);
export default router;