import express from 'express';
const router = express.Router();
import Auth from '../controllers/auth/AuthController.js';

router.post('/', Auth.createUser)
router.post('/login', Auth.logUser)

export default router;