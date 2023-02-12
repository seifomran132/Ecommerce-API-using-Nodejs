import express from "express";
import * as env from "dotenv";
import dbConnection from "./config/database";


env.config();
const {PORT} = process.env;

const app = express();

app.listen(PORT, () => {
  console.log("Server is running of port ", PORT);
});

dbConnection()

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello");
});
