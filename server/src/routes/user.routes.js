import express from 'express';
import { addUser, getUsers, loginUser } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/users', getUsers);
router.post('/add-user', addUser)
router.post('/login', loginUser)

export default router;
