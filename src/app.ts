require("dotenv").config();
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { todoRouter } from "./routes/todos";
import { NotFoundError } from "./errors/not-found-error";
import client from "./redis-cache";
import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./db/connect";

if (!process.env.PORT) {
  process.exit(1);
}

const PORT = process.env.PORT || 8080;

// set-up Express app
const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(helmet());
app.use(cors());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

// set-up routers
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use("/api/v1/", todoRouter);

// health check end-point
app.use("/", (_req: Request, res: Response) => {
  return res.status(200).send("Up!");
});

app.all("*", async (_req, _res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

// set-up Redis client
client.on("error", (error) => {
  console.error(error);
});

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  try {
    connectDB();
  } catch (err) {
    console.error(err);
  }

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

start();
