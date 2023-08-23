const express = require("express");
const app = express();
const cors = require("cors");
const User = require("./models/User");
const mongoose = require("mongoose");
const Post = require("./models/Post");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const fs = require("fs");
require("dotenv").config();

const uploadMiddleware = multer({ dest: "uploads/" });
const salt = bcrypt.genSaltSync(10);

app.use(cors({ credentials: true, origin: "https://snazzy-arithmetic-83818a.netlify.app" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.zvr0qku.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => console.log("connected to the mongodb"))
  .catch((err) => console.log("error connecting to the mongodb", err));

app.post("/register", async (req, res) => {
  const { userName, password } = req.body;
  try {
    const userDoc = await User.create({
      userName,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  const userDoc = await User.findOne({ userName });

  const passOk = bcrypt.compareSync(password, userDoc.password);

  if (passOk) {
    jwt.sign(
      { userName, id: userDoc._id },
      process.env.SECRET,
      {},
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json({
          id: userDoc._id,
          userName,
        });
      }
    );
  } else {
    res.status(400).json("wrong credentials");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, process.env.SECRET, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, process.env.SECRET, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });
    res.json(postDoc);
  });
});

app.get("/post", async (req, res) => {
  res.json(
    await Post.find()
      .populate("author", ["userName"])
      .sort({ createdAt: -1 })
      .limit(20)
  );
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id);
  res.json(postDoc);
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
