import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";

import { articlesRouter } from "./routes";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));

app.get("/api/health", (_req: Request, res: Response) =>
  res.json({ status: "ok" })
);
app.use("/api/articles", articlesRouter);

const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API server listening on port ${PORT}`);
});
