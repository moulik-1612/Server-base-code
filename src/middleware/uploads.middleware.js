import multer from "multer";
import fs from "fs";
import path from "path";

const rootUploadDir = path.join(process.cwd(), "uploads");

/* ensure root upload folder exists */
if (!fs.existsSync(rootUploadDir)) {
  fs.mkdirSync(rootUploadDir, { recursive: true });
}

/* allowed file types */
const fileTypes = {
  image: /jpeg|jpg|png|gif|webp/,
  video: /mp4|mov|avi|mkv/,
};

/* file filter */
const fileFilter = (type) => {
  return (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();

    const valid =
      fileTypes[type].test(ext) && fileTypes[type].test(file.mimetype);

    if (!valid) {
      return cb(
        new Error(`Invalid file type. Only ${type} files allowed.`),
        false,
      );
    }

    cb(null, true);
  };
};

/* -------------------------
UPLOAD FILE
------------------------- */

export const uploadFile = ({
  type = "image",
  folder = "common",
  multiple = false,
  fieldName = "file",
  fields = null,
  maxCount = 5,
} = {}) => {
  /* module folder */
  const moduleUploadDir = path.join(rootUploadDir, folder);

  if (!fs.existsSync(moduleUploadDir)) {
    fs.mkdirSync(moduleUploadDir, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, moduleUploadDir);
    },

    filename: (req, file, cb) => {
      const uniqueName = Date.now() + "-" + file.originalname;
      cb(null, uniqueName);
    },
  });

  const uploader = multer({
    storage,
    fileFilter: fileFilter(type),
    limits: { fileSize: 10 * 1024 * 1024 },
  });

  if (fields) return uploader.fields(fields);

  return multiple
    ? uploader.array(fieldName, maxCount)
    : uploader.single(fieldName);
};

/* -------------------------
DELETE FILE
------------------------- */

export const removeFile = (filePath) => {
  if (!filePath) return;

  const fullPath = path.join(process.cwd(), filePath.replace(/^\/+/, ""));

  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
};
