"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = () => {
    return mongoose_1.default.connect('mongodb+srv://sudohogan:Palamiho85@testing.pzi0ylw.mongodb.net/Week12DB?retryWrites=true&w=majority');
};
exports.connectDB = connectDB;
