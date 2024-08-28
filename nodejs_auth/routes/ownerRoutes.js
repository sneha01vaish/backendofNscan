import express from 'express';
import RestaurantController from '../controllers/RestaurantController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get restaurant details (protected route)
router.post('/restaurant', authenticateToken, RestaurantController.getRestaurant);

// Update restaurant details (protected route)
// router.put('/restaurant', authenticateToken, RestaurantController.updateRestaurantDetails);

export default router;
