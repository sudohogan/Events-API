import { joiRegister, joiLogin } from '../../app/middleware/joiUser'
import { ValidationError } from '../../app/errors'

jest.mock('joi', () => ({
    object: jest.fn(() => ({
        string: jest.fn(() => ({
            required: jest.fn(),
        })),
    })),
}))

jest.mock('../../app/errors', () => ({
    ValidationError: jest.fn()
}))

describe('Joi register user validation', () => {
    beforeEach(()=>{
        jest.clearAllMocks()
    })

    it('calls the next() function if validation is passed ', () => {
        const mockRequest = {
            body: {
                firstName: 'firsts',
                lastName: 'lasty',
                email: 'fries@email.com',
                password: 'password',
                confirmPassword: 'password',
                city: 'City Boys',
                country: 'Nigeria',
                birthDate: '26-08-23'
            }
        }

        const mockResponse = {}
        const mockNext = jest.fn()
        joiRegister(mockRequest as any, mockResponse as any, mockNext)
        expect(mockNext).toHaveBeenCalled()
    })

    it('confirms if password and confirmPassword are the same', ()=>{
        const mockRequest = {
            password: 'password',
            confirmPassword: 'password',
        }
        const mockResponse = {}
        const mockNext = jest.fn()
        joiRegister(mockRequest as any, mockResponse as any, mockNext)
        expect(mockRequest.password).toBe(mockRequest.confirmPassword)
        mockNext()
    })

    it('throws error if validation is failed ', () => {
        const mockRequest = {
            body: {
                firstName: '',
                email: 'fries@email.com',
                password: 'password',
                confirmPassword: '',
                city: 'City Boys',
                country: 'no place',
                birthDate: '2'
            }
        }

        const mockResponse = {}
        const mockNext = jest.fn()
        joiRegister(mockRequest as any, mockResponse as any, mockNext)
        expect(()=>{}).toThrow(ValidationError)
    })
})

describe('Joi login user validation', () => {
    beforeEach(()=>{
        jest.clearAllMocks()
    })

    afterAll(()=>{
        jest.clearAllMocks
    })

    it('calls the next() function if validation is passed ', () => {
        const mockRequest = {
            body: {
                email: 'fries@email.com',
                password: 'password',
            }
        }

        const mockResponse = {}
        const mockNext = jest.fn()
        joiLogin(mockRequest as any, mockResponse as any, mockNext)
        expect(mockNext).toHaveBeenCalled()
    })

    it('throws error if validation is failed ', () => {
        const mockRequest = {
            body: {
                email: '',
                password: '',
            }
        }

        const mockResponse = {}
        const mockNext = jest.fn()
        joiRegister(mockRequest as any, mockResponse as any, mockNext)
        expect(()=>{}).toThrow(ValidationError)
    })
})