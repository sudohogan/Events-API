import User from '../model/User';
import { Request, Response } from "express";
import { NotFoundError, UnauthorizedError, ValidationError} from '../errors';
import jwt from 'jsonwebtoken';


const serverErrorJson = {
  "statusCode": 500,
  "error": "Internal Server Error",
  "message": "Something went wrong"
}

export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      email,
      firstName,
      password,
      passwordConfirm,
      lastName,
      birthDate,
      city,
      country,
    } = req.body;
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      throw new UnauthorizedError(401, 'Unauthorized Error', 'User with email already exists');
    }
    if (!email) {
      throw new ValidationError([{ resource: 'email', message: 'invalid email' }]);
    }
    const user = await User.create({ ...req.body });
  res
    .status(201)
    .json({
        _id: user._id,
        firstName,
        lastName,
        email,
        birthDate,
        city,
        country,
    });
  } catch (error: any) {
    if (error instanceof UnauthorizedError) {
      const jsonError = error.toJSON();
      res.status(jsonError.statusCode).json(jsonError);
    } else if (error instanceof ValidationError) {
      const jsonError = error.toJSON();
      res.json(jsonError)
    } else {
      res.status(500).json(serverErrorJson)
    }
  }
};

export const signIn = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ValidationError([ { resource: 'Email or Password invalid', message: 'Your email or Password is invalid' }]);
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new NotFoundError(404, 'Not Found', 'Not Found');
    }
    const isPass = await user.comparePassword(password);
    if (!isPass) {
      throw new ValidationError([ { resource: 'password', message: 'Your Password is invalid' }]);
    }
    const token = await generateToken(user);
  
    res
      .status(200)
      .set('Authorization', `Bearer ${token}`)
      .json({
        token,
          firstName: user.firstName,
          lastName: user.lastName,
      });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      const jsonError = error.toJSON();
      res.status(jsonError.statusCode).json(jsonError);
    } else if (error instanceof ValidationError) {
      const jsonError = error.toJSON();
      res.json(jsonError)
    } else if (error instanceof NotFoundError) {
      const jsonError = error.toJSON();
      res.status(jsonError.statusCode).json(jsonError);
    } else {
      res.status(500).json(serverErrorJson)
    }
  }
};

const generateToken = async (user: any): Promise<string> => {
  const { _id, email } = user;
  const jwtSecret = 'secret';
  return await jwt.sign({ _id, email }, jwtSecret, { expiresIn: '1h' });
};