import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import DataRoutes from "./routes/DataRoutes.js";
import ConnectDB from './config/ConnectDB.js'

const app=express();
app.use(cors());
app.use(express.json());

dotenv.config()
ConnectDB()

const port = process.env.port || 8000

app.get('/', (req, res) => {
  res.send("Backend is running successfully!");
});

app.use("/api/v1/data/", DataRoutes)

app.listen(port,()=>console.log("Connected"));
