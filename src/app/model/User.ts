import mongoose, { Schema, Document } from 'mongoose'
import bcrypt from 'bcrypt'

export interface UserCollection extends Document {
    firstName: string
    email: string
    password: string
    lastName: string
    confirmPassword: string
    country: string
    city: string
    birthDate: string
    comparePassword(candidatePassword: string): Promise<boolean>
}

const UserSchema: Schema<UserCollection> = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 5,
    },
    lastName: {
        type: String,
        required: true,
        minLength: 5,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    birthDate: {
        type: String,
        required: true,
    },
})

UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword = async function (
    candidatePassword: string
): Promise<boolean> {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

export default mongoose.model<UserCollection>('User', UserSchema)
