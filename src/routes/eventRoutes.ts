import { Router } from "express";
import { joiCreateEvent } from "../middleware/joiEvent";
import {verifyToken} from "../middleware/verifyToken";
import { createEvent, getEvent } from "../controllers/eventController";

export const eventRouter = Router()

eventRouter.post('/', joiCreateEvent, verifyToken, createEvent)
    .get('/', verifyToken, getEvent)