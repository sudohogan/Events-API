import Event from '../model/Event';
import { Request, Response } from "express";
import {NotFoundError, BadRequestError, UnauthorizedError} from '../errors';
import {	StatusCodes } from 'http-status-codes';



export const createEvent = async (req: Request, res: Response) => {
  const userId = req.user._id;
  const  {
    description, dayOfWeek
  } = req.body;
  
  const eventExists = await Event.findOne({ description });
  if (eventExists) {
    throw new BadRequestError('bad req');
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

export const getEvent = async (req: Request, res: Response) => {
    const {description, dayOfWeek} = req.body
      const event = await Event.find({dayOfWeek: dayOfWeek, description: description});    
    if (event.length == 0) {
      throw new NotFoundError('not found');
    }
    res
      .status(200)
      .json({
        event
      });
};

export const deleteEvents = async (req: Request, res: Response)  => {
    const { dayOfWeek } = req.body;
    const deletedEvents = await Event.find({ dayOfWeek });
    if (!deletedEvents) {
      throw new NotFoundError('Not found');
    }    
    await Event.deleteMany({dayOfWeek: dayOfWeek})    
    res.status(200).json({ deletedEvents});
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