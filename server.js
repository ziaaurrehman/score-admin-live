import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/db.js";
import router from "./user/userRoute.js";
import matchRouter from "./match/matchRouter.js";
import profileRoute from "./user/userProfileUpload.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import newsRoute from "./news/newUpload.js";
import newsUpdateRoute from "./news/newsupdate.js";
import newsRouter from "./news/newsRouter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());


const MONGO_DB = process.env.MONGO_DB;
connectDb(MONGO_DB);

app.use("/api", router);
app.use("/api", matchRouter);
app.use(express.urlencoded({ extended: true, limit: "500mb" }));
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use("/newsuploads", express.static(path.join(__dirname, "/newsuploads")));
app.use("/api", profileRoute);
app.use("/api", newsRoute);
app.use("/api", newsUpdateRoute);
app.use("/api", newsRouter);

if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(express.static(path.join(__dirname, "./client/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "./client/dist/index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

const PORT = 5050;
app.listen(PORT, (req, res) => {
  console.log(`server is running on port ${PORT}`);
});
