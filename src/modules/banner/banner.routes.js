import express from "express";
import {
  createBanner,
  getBanners,
  getBannerById,
  updateBanner,
  deleteBanner,
} from "./banner.controller.js";

import { uploadFile } from "../../middleware/uploads.middleware.js";
import { errorHandler } from "../../middleware/error.middleware.js";

const router = express.Router();

/* -------------------------
UPLOAD CONFIG
------------------------- */

const uploadBanner = uploadFile({
  type: "image",
  folder: "banner", // 👈 important
  fields: [
    { name: "imageUrl", maxCount: 1 },
    { name: "mobileImageUrl", maxCount: 1 },
  ],
});

/* -------------------------
ROUTES
------------------------- */

// Create banner
router.post("/banner", uploadBanner, errorHandler, createBanner);

// Get all banners
router.get("/banner", getBanners);

// Get single banner
router.get("/banner/:id", getBannerById);

// Update banner
router.patch("/banner/:id", uploadBanner, errorHandler, updateBanner);

// Delete banner
router.delete("/banner/:id", deleteBanner);

export default router;
