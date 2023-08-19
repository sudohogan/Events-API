import Event from '../model/Event';
import { Request, Response } from "express";
import {CustomAPIError} from '../errors';


export const createEvent = async (req: Request, res: Response) => {
  const {
    description, dayOfWeek
  } = req.body;
  
  const eventExists = await Event.findOne({ description });
  if (eventExists) {
    throw new CustomAPIError.BadRequestError({
      statusCode: 'Validation error',
      errors: [
        {
          resource: 'Event',
          message: 'Invalid Event',
        },
      ],
    });
  }
  const event = await Event.create({ ...req.body });
  res
    .status(201)
    .json({
        _id: event._id,
        description,
        dayOfWeek,
        userId: req.user._id
    });
};

export const getEvent = async (req: Request, res: Response): Promise<void> => {
    const auths: any = req.headers['authorization'];
    if (!auths) {
      throw new CustomAPIError.UnauthorizedError({
        statusCode: 401,
        message: 'Not Authenticated',
        error: 'Unauthorized',
      });
    }
    const event = await Event.findOne(auths._id);
    if (!event) {
      throw new CustomAPIError.NotFoundError({
        statusCode: 404,
        message: 'Event not found',
        error: 'Not Found',
      });
    }
    res
      .status(200)
      .json({
        _id: event._id,
        description: event.description,
        dayOfWeek: event.dayOfWeek,
        userId: req.user._id,
      });
  };