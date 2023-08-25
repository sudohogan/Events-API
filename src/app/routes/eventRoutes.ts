import { Router } from "express";
import { joiEvent } from "../middleware/joiEvent";
import {verifyToken} from "../middleware/verifyToken";
import { createEvent, deleteEventById, deleteEvents, getEvent, getEventById } from "../controllers/eventController";

export const eventRouter = Router()

eventRouter.post('/', joiEvent, verifyToken, createEvent)
    .get('/', joiEvent, verifyToken, getEvent)
    .delete('/', verifyToken, deleteEvents)
    .delete('/:id', verifyToken, deleteEventById)
    .get('/:id', verifyToken, getEventById)