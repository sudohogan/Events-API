"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connect_1 = require("./db/connect");
const userRoutes_1 = require("./routes/userRoutes");
const app = (0, express_1.default)();
app.use(userRoutes_1.router);
const port = process.env.PORT || 3000;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, connect_1.connectDB)(process.env.PORT);
        app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    }
    catch (error) {
        console.log(error);
    }
});
start();