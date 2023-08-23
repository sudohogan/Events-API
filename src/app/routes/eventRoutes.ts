import { Router } from "express";
import { joiCreateEvent } from "../middleware/joiEvent";
import {verifyToken} from "../middleware/verifyToken";
import { createEvent, deleteEventById, deleteEvents, getEvent, getEventById } from "../controllers/eventController";

export const eventRouter = Router()

eventRouter.post('/', joiCreateEvent, verifyToken, createEvent)
    .get('/', verifyToken, getEvent)
    .delete('/', verifyToken, deleteEvents)
    .delete('/:id', verifyToken, deleteEventById)
    .get('/:id', verifyToken, getEventById)