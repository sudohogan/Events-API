export class ValidationError extends Error {
    errors: { resource: string; message: string }[]

    constructor(errors: { resource: string; message: string }[]) {
        super('Validation Error')
        this.name = 'ValidationError'
        this.errors = errors
    }

    toJSON() {
        return {
            type: 'Validation Error',
            errors: this.errors,
        }
    }
}
