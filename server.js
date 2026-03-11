import { createServer } from "http";
import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";
import dotenv from "dotenv";

const server = createServer(app);

const PORT = process.env.PORT || 5000;

dotenv.config();

//connect db
connectDB();

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
