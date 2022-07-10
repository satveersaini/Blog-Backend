import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import model from "./BlogPost.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to DB and started listening");
    });
  })
  .catch((error) => {
    console.log(error.message);
  });

app.get("/", async (req, res) => {
  const AllBlogs = await model.find({});
  res.status(200).json(AllBlogs);
});

app.post("/", async (req, res) => {
  const post = req.body;
  try {
    const savedPost = await model.create(post);
    console.log(savedPost);
    res.status(200).send(savedPost);
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const post = await model.findById(id);
    res.status(200).json(post);
  } catch (error) {
    console.log(error.message);
    res.status(404).send("Page Not Found");
  }
});

app.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const post = await model.findByIdAndDelete(id);
    res.status(200).json(post);
  } catch (error) {
    console.log(error.message);
  }
});

app.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const post = req.body;
  try {
    const savedPost = await model.findByIdAndUpdate(id, post);
    res.status(200).send(savedPost);
  } catch (error) {
    console.log(error.message);
  }
});

app.patch("/:id/like", async (req, res) => {
  const id = req.params.id;
  try {
    const currentPost = await model.findById(id);
    const savedPost = await model.findByIdAndUpdate(id, {
      upvote: currentPost.upvote + 1,
    });
    res.status(200).send(savedPost);
  } catch (error) {
    console.log(error.message);
  }
});
