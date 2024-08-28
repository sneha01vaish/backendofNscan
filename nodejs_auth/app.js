import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import connectDB from './config/connectdb.js'
import userRoutes from './routes/userRoutes.js'
import ownerRoutes from './routes/ownerRoutes.js'

const app = express()
const port =process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL
//cors policy
app.use(cors())

//database connection
connectDB(DATABASE_URL)

//JSON
app.use(express.json())

//load Routes
app.use("/api/owner", ownerRoutes);
app.use("/api/user", userRoutes)

app.listen(port, () => {
    console.log(`Server is listening at  http://localhost:${port}`);
  });

