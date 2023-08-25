import Joi from 'joi'
import { Request, Response, NextFunction } from 'express'
import { ValidationError } from '../errors'

const days = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
]

export const joiEvent = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        description: Joi.string().required(),
        dayOfWeek: Joi.string()
            .valid(...days)
            .required(),
    })

    const { error } = schema.validate(req.body, { abortEarly: false })
    if (error) {
        throw new ValidationError([
            { resource: 'input', message: 'invalid input' },
        ])
    }
    return next()
}
