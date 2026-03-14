import express from "express";
import cors from "cors";
import { router } from "./routes/index.js";

const app = express();

/* -------------------------
CORS
------------------------- */
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  }),
);

/* -------------------------
BODY PARSERS
------------------------- */

// Parse JSON bodies
app.use(express.json());

// Parse form-data without files
app.use(express.urlencoded({ extended: true }));

/* -------------------------
ROUTES
------------------------- */

app.use("/", router);

/* -------------------------
STATIC FILE ACCESS
------------------------- */

// so uploaded files can be accessed in browser
app.use("/uploads", express.static("uploads"));

export default app;
