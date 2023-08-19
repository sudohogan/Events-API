"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const joiUser_1 = require("../middleware/joiUser");
const userController_1 = require("../controllers/userController");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post('/sign-up', joiUser_1.joiRegister, userController_1.signUp).post('/sign-in', joiUser_1.joiLogin, userController_1.signIn);
