import express from "express";
import * as env from "dotenv";
import dbConnection from "./config/database";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import categoryRouter from "./routes/CategoryRoute";
import productRouter from "./routes/ProductRoute";

env.config();
const { PORT } = process.env;

const app = express();

// middlewares
app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
app.use(morgan("tiny"));

app.listen(PORT, () => {
  console.log("Server is running of port ", PORT);
});

dbConnection();

// Routes

app.use("/category", categoryRouter);
app.use("/product", productRouter);

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello");
});
