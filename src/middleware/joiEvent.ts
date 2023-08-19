import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { CustomAPIError } from "../errors/custom-api";

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

export const joiCreateEvent = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      description: Joi.string().required(),
      dayOfWeek: Joi.string().valid(...days).required(),
    });
  
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      throw new CustomAPIError.UnauthenticatedError(error);
    }
    return next();
  };