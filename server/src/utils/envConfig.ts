import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PROD_PORT || process.env.DEV_PORT,
  mongoUrl: process.env.MONGO_URL || '',
  keyJwt: process.env.KEY_JWT
}

export default config;

