import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
// import { Restaurant } from '../models/Restaurant.js';

class UserController {
    // User registration
    static userRegistration = async (req, res) => {
        const { username, email, password, password_confirmation, phone_number, role } = req.body;

        if (!role || !['customer', 'owner', 'staff'].includes(role)) {
            return res.status(400).send({ "status": "failed", "message": "Invalid role provided" });
        }

        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).send({ "status": "failed", "message": "Email already exists" });
        }

        if (password !== password_confirmation) {
            return res.status(400).send({ "status": "failed", "message": "Password and Password Confirmation do not match!" });
        }

        try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            const newUser = new User({
                username: username,
                email: email,
                password_hash: hashPassword,
                phone_number: phone_number,
                role: role
            });
            await newUser.save();

            const token = jwt.sign({ userID: newUser._id, role: newUser.role }, process.env.JWT_SECRET_KEY, { expiresIn: "10d" });
            res.status(201).send({ "status": "Success", "message": "Registration successful", "token": token });
        } catch (error) {
            console.error(error);
            res.status(500).send({ "status": "failed", "message": "Unable to register" });
        }
    }

    // User login
    static userLogin = async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ "status": "failed", "message": "All fields are required!" });
        }

        try {
            const user = await User.findOne({ email: email });
            if (!user) {
                return res.status(404).send({ "status": "failed", "message": "You are not a registered user" });
            }

            const isMatch = await bcrypt.compare(password, user.password_hash);
            if (!isMatch) {
                return res.status(400).send({ "status": "failed", "message": "Password or Email does not match!" });
            }

            const token = jwt.sign({ userID: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
            res.send({ "status": "Success", "message": "Login successfully", "token": token });
        } catch (error) {
            console.error(error);
            res.status(500).send({ "status": "failed", "message": "Unable to login!" });
        }
    }
}

export default UserController;
