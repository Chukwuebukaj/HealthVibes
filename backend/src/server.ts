import express, { Request, Response } from "express";
import sqlite3 from "sqlite3";
import bodyParser from "body-parser";
import db from "./database/db.config";
import adminRoute from "./routes/adminRoute";
import userRouter from "../src/routes/userRoutes";
import appointmentRoute from "./routes/appointmentRoute";
import professionalRouter from "../src/routes/professionalRoutes";
import cors from "cors";

db.sync()
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(cors());
app.use(cors(
  {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    preflightContinue: false
  }
));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/admin", adminRoute);
app.use("/", userRouter);
app.use("/appointment", appointmentRoute);
app.use("/", professionalRouter);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
