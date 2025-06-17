import http from "http";
import { app } from "./app/index.js";
import { env } from "./env.js";
import { connectDb, connection } from "./app/db/index.js";

const server = http.createServer(app);

connectDb(connection)
  .then(() => {
    console.log("Database connection established successfully.");
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });

server.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
  connectDb(connection);
});
