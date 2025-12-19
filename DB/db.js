// we will handle connectivity btw express and mongodb
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

const connectDb = () => {
     try{
        mongoose.connect(process.env.MONGODB_URL);
        console.log("db has been connected");
     } catch (err){
        console.error("Database connection error:", err);
     }
}

export default connectDb