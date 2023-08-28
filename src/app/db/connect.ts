import mongoose from 'mongoose'
import 'dotenv/config'

export const connectDB = () => {
    return mongoose.connect(
        process.env.MONGO_URL as any
    )
}
