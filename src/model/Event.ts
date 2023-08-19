import mongoose from 'mongoose';

export const EventSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    minLength: 5
  },
  dayOfWeek: {
    type: String,
    required: true,
    enum: [
        'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
    ]
  },
  // userId: {
  //   type: mongoose.Types.ObjectId,
  //   ref: 'User',
  //   required: true,
  // },
})

export default mongoose.model('Event', EventSchema);