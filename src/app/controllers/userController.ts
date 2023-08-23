import User from '../model/User';
import { Request, Response } from "express";
import {BadRequestError, NotFoundError, UnauthorizedError} from '../errors';
import jwt from 'jsonwebtoken';


export const signUp = async (req: Request, res: Response) => {
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
    throw new BadRequestError('');
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
};

export const signIn = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('');
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundError('');
  }
  const isPass = await user.comparePassword(password);
  if (!isPass) {
    throw new UnauthorizedError('Email or password is invalid');
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
};

const generateToken = async (user: any) => {
  const { _id, email } = user;
  const jwtSecret = 'secret';
  return await jwt.sign({ _id, email }, jwtSecret, { expiresIn: '1h' });
};