// add more route here

import { Router } from "express";
import userRoutes from "./user/userRoutes.js";

export const router = Router();

router.get("/", (req, res) => {
  res.send("Welcome to Shridha server");
});

router.use(userRoutes);
