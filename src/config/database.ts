import mongoose from "mongoose";
import * as env from 'dotenv';

env.config()
const {MONGO_URL} = process.env
const mongoUrl = MONGO_URL as string

function dbConnection() {
  try {
    const conn = mongoose.connect(mongoUrl);
    console.log("Connected to database");
  } catch (err) {
    console.log("Error connecting to database, ", err);
  }
}

export default dbConnection