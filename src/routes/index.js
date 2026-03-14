// add more route here

import { Router } from "express";
import userRoutes from "./user/userRoutes.js";

export const router = Router();

router.use(userRoutes);
