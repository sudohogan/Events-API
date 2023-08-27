import { joiEvent } from '../../app/middleware/joiEvent'
import { ValidationError } from '../../app/errors'

jest.mock('joi', () => ({
    object: jest.fn(() => ({
        string: jest.fn(() => ({
            required: jest.fn(),
        })),
    })),
}))

jest.mock('../../app/errors', () => ({
    ValidationError: jest.fn(),
}))

describe('joiEvent', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should call next() if validation passes', () => {
        const mockRequest = {
            body: {
                description: 'good day',
                dayOfWeek: 'thursday',
            },
        }

        const mockResponse = {}
        const mockNext = jest.fn()

        joiEvent(mockRequest as any, mockResponse as any, mockNext)
        expect(mockNext).toHaveBeenCalled()
    })

    it('returns error if validation fails', () => {
        const mockRequest = {
            body: {
                description: '',
                dayOfWeek: 'no day',
            },
        }
        const mockResponse = {}
        const mockNext = jest.fn()

        joiEvent(mockRequest as any, mockResponse as any, mockNext)
        expect(() => {}).toThrow(ValidationError)
    })
})
