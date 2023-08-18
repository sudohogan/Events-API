import express, {Request, Response} from "express";
import {connectDB} from "./db/connect";
import { router } from "./routes/userRoutes";

const app = express()

app.use(router)

const port =  process.env.PORT || 3000;
const start = async (): Promise<void> => {
  try {
    await connectDB( process.env.PORT);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();