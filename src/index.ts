import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";
import { connect } from "mongoose";
import "dotenv/config";
import cors, { CorsOptions } from "cors";
import todosRouter from "./routes/todo";

// Allow requests from all origins
const corsOptions: CorsOptions = {
  origin: "*",
};

run().catch((err: Error) => {
  console.log(err);
});

const app = express();

app.use(cors(corsOptions));

app.use(json());

app.use("/todos", todosRouter);

app.listen(4000, () => {
  console.log(`Running on http://localhost:4000`);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

async function run() {
  await connect(process.env.MONGODB_CONNECTION_STRING as string);
  console.log("DB connected!");
}

console.log("feature b");

console.log("feature a");
console.log("feature a 2");
