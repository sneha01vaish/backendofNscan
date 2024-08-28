import { Restaurant } from '../models/Restaurant.js';
// import jwt from 'jsonwebtoken';

class RestaurantController {
    // Get restaurant details for owner
    static getRestaurantDetails = async (req, res) => {
        const userID = req.userID;

        try {
            const restaurant = await Restaurant.findOne({ owner_id: userID });
            if (!restaurant) {
                return res.status(404).send({ "status": "failed", "message": "Restaurant not found" });
            }

            res.send({ "status": "Success", "restaurant": restaurant });
        } catch (error) {
            console.error(error);
            res.status(500).send({ "status": "failed", "message": "Unable to fetch restaurant details" });
        }
    }

    // Update restaurant details
    static updateRestaurantDetails = async (req, res) => {
        const userID = req.userID;
        const { name, address, contact_number, social_media_links, description, type, logo_url } = req.body;

        try {
            const restaurant = await Restaurant.findOneAndUpdate(
                { owner_id: userID },
                { name, address, contact_number, social_media_links, description, type, logo_url },
                { new: true }
            );

            if (!restaurant) {
                return res.status(404).send({ "status": "failed", "message": "Restaurant not found" });
            }

            res.send({ "status": "Success", "message": "Restaurant details updated", "restaurant": restaurant });
        } catch (error) {
            console.error(error);
            res.status(500).send({ "status": "failed", "message": "Unable to update restaurant details" });
        }
    }
}

export default RestaurantController;
