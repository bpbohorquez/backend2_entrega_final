import dotenv from "dotenv";

// import { configDotenv } from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT,
  mongoURL: process.env.MONGO_URL,
};
