import Banner from "./banner.model.js";
import { removeFile } from "../../middleware/uploads.middleware.js";

/* -------------------------
CREATE BANNER
------------------------- */
export const createBanner = async (req, res) => {
  try {
    if (!req.files?.imageUrl || !req.files?.mobileImageUrl) {
      return res.status(400).json({
        success: false,
        message: "Both banner images are required",
      });
    }

    const imageUrl = "/uploads/banner/" + req.files.imageUrl[0].filename;

    const mobileImageUrl =
      "/uploads/banner/" + req.files.mobileImageUrl[0].filename;

    const banner = await Banner.create({
      imageUrl,
      mobileImageUrl,
    });

    res.status(201).json({
      success: true,
      banner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------
GET ALL BANNERS
------------------------- */
export const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: banners.length,
      data: banners,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------
GET SINGLE BANNER
------------------------- */
export const getBannerById = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    res.json({
      success: true,
      data: banner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------
UPDATE BANNER
------------------------- */
export const updateBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    const image = req.files?.imageUrl?.[0];
    const mobileImage = req.files?.mobileImageUrl?.[0];

    if (image) {
      removeFile(banner.imageUrl);
      banner.imageUrl = `/uploads/banner/${image.filename}`;
    }

    if (mobileImage) {
      removeFile(banner.mobileImageUrl);
      banner.mobileImageUrl = `/uploads/banner/${mobileImage.filename}`;
    }

    await banner.save();

    res.json({
      success: true,
      message: "Banner updated successfully",
      data: banner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------
DELETE BANNER
------------------------- */
export const deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    removeFile(banner.imageUrl);
    removeFile(banner.mobileImageUrl);

    await banner.deleteOne();

    res.json({
      success: true,
      message: "Banner deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
