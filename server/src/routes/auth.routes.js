import { Router } from 'express';
import { register, login, } from '../controllers/auth.controller.js';
const router = Router();
// Register a new user
router.post('/register', register);
// Login existing user
router.post('/login', login);
export default router;
//# sourceMappingURL=auth.routes.js.map