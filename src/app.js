import express from "express";
import cors from "cors";
import { router } from "./routes/index.js";

const app = express();

app.use(express.json());

app.use(router);

app.use(
  cors({
    origin: "*", // You can restrict it later to your domain
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  }),
);

export default app;
