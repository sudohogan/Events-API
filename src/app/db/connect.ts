import mongoose from 'mongoose'
import "dotenv/config";

export const connectDB = () => {
    return mongoose.connect(
        //'mongodb+srv://sudohogan:Palamiho85@testing.pzi0ylw.mongodb.net/Week12DB?retryWrites=true&w=majority'
        process.env.MONGO_URL as any
    )
}
