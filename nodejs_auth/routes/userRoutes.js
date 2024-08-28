import express from 'express';
const router = express.Router()
import UserController from '../controllers/userController.js';



//public routes
router.post('/register', UserController.userRegistration);
// router.get('/verify-email', UserController.verifyEmail);
router.post('/login', UserController.userLogin)

// restaurant routes==


//private routes

export default router