// middlewares/employeeAuth.js
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

const employeeAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.userID);

    if (user && user.role === 'employee') {
      req.userID = decoded.userID;
      next();
    } else {
      res.status(403).send({ "status": "failed", "message": "Access denied! Employee only route." });
    }
  } catch (error) {
    res.status(401).send({ "status": "failed", "message": "Unauthorized! Invalid or missing token." });
  }
};

export default employeeAuth;
