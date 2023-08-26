import "dotenv/config";
import { connectDB } from '../../app/db/connect'
jest.mock('mongoose')

export const mongooseMock = {
    connect: jest.fn(),
}

describe('Test to connect to DB', () => {
    it('connects the database via mongoose', async () => {
        const mongooseMock = require('mongoose')
        mongooseMock.connect.mockResolvedValueOnce()
        await connectDB()
        expect(mongooseMock.connect).toHaveBeenCalledWith(
            process.env.MONGO_URL
        )
    })
})
