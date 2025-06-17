import dotenv from "dotenv";
dotenv.config();

const env = {
  PORT: process.env.PORT ?? 3000,
  DB: {
    HOST: process.env.DB_HOST ?? "127.0.0.1",
    PORT: process.env.DB_PORT ?? "3306",
    USER: process.env.DB_USER ?? "root",
    PASSWORD: process.env.DB_PASSWORD ?? "password",
  },
};

export { env };
