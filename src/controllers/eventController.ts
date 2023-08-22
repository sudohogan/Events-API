import Event from '../model/Event';
import { Request, Response } from "express";
import {CustomAPIError} from '../errors';
import {	StatusCodes } from 'http-status-codes';



export const createEvent = async (req: Request, res: Response) => {
  const userId = req.user._id;
  const  {
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
  const event = await Event.create({ description, dayOfWeek, userId});
  res
    .status(201)
    .json({
        _id: event._id,
        description,
        dayOfWeek,
        userId
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
    const {description, dayOfWeek} = req.body
    const event = await Event.find(req.body);
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
        event,
      });
};

export const deleteEvents = async (req: Request, res: Response)  => {
    const { dayOfWeek } = req.body;
    const events = await Event.find({ dayOfWeek });
    if (!events) {
      // throw new CustomAPIError.NotFoundError({
      //   statusCode: 404,
      //   message: 'event not found',
      //   error: 'Not Found',
      // });
      throw new Error ('Not found')
    }    
    await Event.deleteMany({dayOfWeek: dayOfWeek})    
    res.status(200).json({ events});
};

export const deleteEventById = async (req: Request, res: Response) => {
  const 
    { id: eventId } = req.params

  const event = await Event.findByIdAndDelete(eventId)
  console.log(event);
  
  res.status(StatusCodes.NO_CONTENT).json({})
}

export const getEventById = async (req: Request, res: Response) => {
  const 
    { id: eventId } = req.params

  const event = await Event.findById(eventId)
  
  res.status(StatusCodes.OK).json({event})
}