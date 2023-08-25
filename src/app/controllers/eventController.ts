import Event from '../model/Event';
import { Request, Response } from "express";
import {NotFoundError, UnauthorizedError, ValidationError} from '../errors';
import {	StatusCodes } from 'http-status-codes';


const serverErrorJson = {
  "statusCode": 500,
  "error": "Internal Server Error",
  "message": "Something went wrong"
}

export const createEvent = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    const  {
      description, dayOfWeek
    } = req.body;
    const eventExists = await Event.findOne({ description });
    if (eventExists) {
      throw new UnauthorizedError(401, 'Unauthorized Error', 'Event already exists');
    };
    const event = await Event.create({ description, dayOfWeek, userId});
    res
      .status(201)
      .json({
          _id: event._id,
          description,
          dayOfWeek,
          userId
      });
  } catch (error: any) {
    if (error instanceof UnauthorizedError) {
      const errorJson = error.toJSON();
      res.status(errorJson.statusCode).json(errorJson);
    }else {
      res.json(serverErrorJson);
    };
  }
};

export const getEvent = async (req: Request, res: Response) => {
    try {
      const {description, dayOfWeek} = req.body
      if (!description || !dayOfWeek) {
        throw new ValidationError([ {resource: "input", message: "invalid input"} ]);
      }
      const event = await Event.find({dayOfWeek: dayOfWeek, description: description}); 
      if (event.length < 1) {
        throw new NotFoundError(404, 'Not Found', 'Events Not Found');
      };
      res.status(200).json(event);
    } 
      
    catch (error: any) {
      if (error instanceof NotFoundError) {
        const errorJson = error.toJSON();
        res.status(errorJson.statusCode).json(errorJson);
      } else if (error instanceof ValidationError) {
        const errorJson = error.toJSON();
        res.status(400).json(errorJson);
      }else {
        res.status(500).json(serverErrorJson)
      };
    }
};

export const deleteEvents = async (req: Request, res: Response)  => {
  try {
    const { dayOfWeek } = req.body;
    if (!dayOfWeek) {
      throw new ValidationError([ {resource: "dayOfWeek", message: "invalid input"} ]);
    }
    const deletedEvents = await Event.find({ dayOfWeek: dayOfWeek }); 
    if (deletedEvents.length < 1) {
      throw new NotFoundError(404, 'Not Found', 'Event not found')
    }      
    await Event.deleteMany({dayOfWeek: dayOfWeek}) 

    res.status(200).json({ deletedEvents});
  } catch (error) {
    if (error instanceof NotFoundError) {
      const errorJson = error.toJSON();
      res.status(errorJson.statusCode).json(errorJson);
    } else if (error instanceof ValidationError) {
        const errorJson = error.toJSON();
        res.status(400).json(errorJson);
      }else {
        res.status(500).json(serverErrorJson)
    };
  }
};

export const deleteEventById = async (req: Request, res: Response): Promise<void> => {
  try {
    const 
    { id: eventId } = req.params
    if (!req.params) {
      throw new Error("Invalid Id supplied")
    }
    const event = await Event.findByIdAndDelete(eventId)
    if (!event) {
    throw new NotFoundError(404, 'Not Found', `No Evevnt with id found`);
    }
    res.status(StatusCodes.NO_CONTENT).json({msg: 'Event deleted'})
  } catch (error) {
    if (error instanceof NotFoundError) {
      const errorJson = error.toJSON();
      res.status(errorJson.statusCode).json(errorJson);
    } else if (error instanceof Error) {
        res.status(400).json({ statusCode: 400,
          error: "Invalid Input",
          message: "Id is invalid"});
      } else {
        res.status(500).json(serverErrorJson)
    };
  }  
}

export const getEventById = async (req: Request, res: Response) => {
  try {
  const 
    { id: eventId } = req.params
  if (!req.params) {
    throw new Error("Invalid Id supplied");
  }
  const event = await Event.findById(eventId)
  if (!event) {
    throw new NotFoundError(404, 'Not Found', `No Evevnt with ${req.params} found`);    
  }
  res.status(StatusCodes.OK).json(event)
  } catch (error) {
    if (error instanceof NotFoundError) {
      const errorJson = error.toJSON();
      res.status(errorJson.statusCode).json(errorJson);
    } else if (error instanceof Error) {
        res.status(400).json({ statusCode: 400,
          error: "Invalid Input",
          message: "Id is invalid"});
      } else {
        res.status(500).json(serverErrorJson)
    };
  }

}