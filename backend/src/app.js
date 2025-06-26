import express from "express";
import { createServer } from "node:http";
import mongoose from "mongoose";
import { connectTOSocket } from "./controllers/socketManager.js";
import cors from "cors";
import userRoutes from "./routers/users.routes.js"

const app = express();
const server = createServer(app);
const io = connectTOSocket(server);

app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

const start = async () => {
  const connectionDb = await mongoose.connect(
    "mongodb+srv://sumankandisuman:8144975283@cluster0.6nyhoxt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log(`DB CONNECTED ${connectionDb.connection.host}`);
  server.listen(app.get("port"), () => {
    console.log("APP IS LISTENING ON 8080");
  });
};
start();
