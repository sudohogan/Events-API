"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventRouter = void 0;
const express_1 = require("express");
const joiEvent_1 = require("../middleware/joiEvent");
const verifyToken_1 = require("../middleware/verifyToken");
const eventController_1 = require("../controllers/eventController");
exports.eventRouter = (0, express_1.Router)();
exports.eventRouter.post('/', joiEvent_1.joiCreateEvent, verifyToken_1.verifyToken, eventController_1.createEvent)
    .get('/', verifyToken_1.verifyToken, eventController_1.getEvent)
    .delete('/', verifyToken_1.verifyToken, eventController_1.deleteEvents)
    .delete('/:id', verifyToken_1.verifyToken, eventController_1.deleteEventById)
    .get('/:id', verifyToken_1.verifyToken, eventController_1.getEventById);
