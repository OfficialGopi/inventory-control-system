import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  }),
);

// APIS
import { router as booksRouter } from "./routes/books.routes.js";
import { router as membersRouter } from "./routes/members.routes.js";
import { router as borrowRouter } from "./routes/borrow.routes.js";

app.use("/api/books", booksRouter);
app.use("/api/members", membersRouter);
app.use("/api/borrow", borrowRouter);

//ERROR HANDLING
import { errorMiddleware } from "./middlewares/error.middleware.js";

app.use(errorMiddleware);

export { app };
