import { InternalServerError } from "../../app/errors";
import { StatusCodes } from "http-status-codes";

describe('Internal Server Error Suite', ()=>{
    const statusCode = StatusCodes.INTERNAL_SERVER_ERROR
    const error = 'Internal Server Error'
    const  message = 'The server encountered an unexpected condition that prevented it from fulfilling the request.'
    const internalServerError = new InternalServerError(statusCode, error, message)

    it('returns the correct status code', ()=>{
        expect(statusCode).toBe(internalServerError.statusCode)
    })

    it('returns the correct error message', ()=>{
        expect(error).toBe(internalServerError.error)
    })

    it('returns the correct message', ()=>{
        expect(message).toBe(internalServerError.message)
    })

    it('returns the correct JSON format', ()=>{
        const resultJSON = {
            statusCode: statusCode,
            error: error,
            message: message,
          };
        expect(internalServerError.toJSON()).toEqual(resultJSON)
    })
})