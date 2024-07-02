import { StatusCodes } from 'http-status-codes'

export class InternalServerError extends Error {
    statusCode: number
    error: string
    message: string

    constructor(statusCode: number, error: string, message: string) {
        super(message)
        this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR
        this.error = error
        this.message = message
    }

    toJSON() {
        return {
            statusCode: this.statusCode,
            error: this.error,
            message: this.message,
        }
    }
}
