import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
    mobileImageUrl: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model("Banner", bannerSchema);
