// routes/menuRoutes.js
import express from 'express';
import MenuController from '../controllers/menucontroller.js';
import authMiddleware from '../middleware/employeeAuth.js'; // Ensure only logged-in employees access

const router = express.Router();

router.post('/section', authMiddleware, MenuController.createSection);
router.post('/dish', authMiddleware, MenuController.addDish);
router.delete('/dish/:dishId', authMiddleware, MenuController.deleteDish);
router.post('/add-dish', authMiddleware, MenuController.addDish);


export default router;
