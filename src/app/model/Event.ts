import mongoose, { Schema } from 'mongoose'
import user from './User'

export interface EventCollection extends Document {
    description: string
    dayOfWeek: string
    userId: any
}

export const EventSchema: Schema<EventCollection> = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        minLength: 5,
    },
    dayOfWeek: {
        type: String,
        required: true,
        enum: [
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
            'sunday',
        ],
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
})

export default mongoose.model('Event', EventSchema)
