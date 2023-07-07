import express from "express";
import mongoose from "mongoose";
import blogRouter from "./routes/blog-routes";
import router from "./routes/user-routes";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://oju-blogs.vercel.app');
  next();
});

app.use(cors());

app.use(express.json());

app.use("/api/user", router);
app.use("/api/blog", blogRouter);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(5000, () => {
      console.log("Connected to Database and Listening to Localhost 5000");
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

app.use((req, res) => {
  res.status(404).json({
    message: "404 Not Found",
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Internal Server Error",
  });
});