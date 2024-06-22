import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

// Load .env file
dotenv.config();

const app = express();


//middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))

app.use(express.json({limit: "30mb"}));
app.use(express.urlencoded({ extended: true,limit:"30mb" }));
app.use(cookieParser());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;


connectDB(MONGO_URI);

//routes
app.use('/api/v1/users',userRoutes);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
