import express, {Request, Response} from "express";
import {connectDB} from "./db/connect";
import { userRouter } from "./routes/userRoutes";
import bodyParser from 'body-parser';


const app = express()

app.use(bodyParser.json());
app.use('/api/v1/users', userRouter)

const port =  process.env.PORT || 3000;
const start = async (): Promise<void> => {
  try {
    await connectDB();
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();