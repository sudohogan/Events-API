import Joi from 'joi'; 
import { Request, Response, NextFunction } from "express";
import { UnauthorizedError, ValidationError } from "../errors";

export const joiLogin = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    email: Joi.string().email().trim().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    throw new ValidationError([ {resource: "email",
    message: "invalid email"} ]);
  }
  return next();
};

export const joiRegister = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    firstName: Joi.string().error(new Error(' first name is invalid')),
    lastName: Joi.string().required().error(new Error(' last name is invalid')),
    email: Joi.string().email().trim().required().error(new Error(' email is invalid')),
    password: Joi.string().min(6).required().error(new Error(' pin is invalid')),
    confirmPassword: Joi.string()
      .valid(Joi.ref('password'))
      .required()
      .messages({
        'any.only': 'Passwords do not match',
      }).error(new Error(' pass is invalid')),
    city: Joi.string().required().error(new Error(' city is invalid')),
    country: Joi.string().required().error(new Error('country is invalid')),
    birthDate: Joi.date().error(new Error('date is invalid'))
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    throw new ValidationError([ {resource: "input",
    message: "invalid input"} ]);
  }
  return next();
};