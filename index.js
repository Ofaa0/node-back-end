const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./db");
const Article = require("./models/Article");
require("dotenv").config();
// const cors = require("cors");

const app = express();

// mongodb+srv://raufzaidany_db_user:<db_password>@cluster0.myvb93t.mongodb.net/?appName=Cluster0
// mongoose.connect(process.env.MONGO_URI)
//     .then(() => {
//         console.log("connected succesfully");
//     }).catch((error) => {
//         console.log(error);
//     })
app.use(async (req, res, next) => {
  await connectDB();
  next();
});
app.use(express.json())
// app.use(cors({
//     origin: "http://localhost:5173"
// }));

const PORT = 8005;

app.get("/hello", (req, res) => {
    res.send("hello from get")
})
app.get("/goodbye", (req, res) => {
    res.end("goodbye from get")
})
app.get("/sayHello", (req, res) => {
    const { name } = req.body
    console.log(name);
    console.log(req.query);


    res.end(`hello , ${name}`)
})
app.get("/about", (req, res) => {
    res.end("Welcome to the about page")
})
app.post("/post", async (req, res) => {
    const { title, body, views } = req.body
    const newArticle = new Article();
    newArticle.title = title;
    newArticle.content = body;
    newArticle.numberOfViews = views;
    await newArticle.save()

    res.json({
        title: title,
        body: body,
        views: views
    })
})
app.get("/post", async (req, res) => {
    const articles = await Article.find();
    res.json(articles)
})
app.get("/post/:id", async (req, res) => {
    const { id } = req.params;
    const article = await Article.findById(id);
    res.json(article)
})
app.delete("/post/:id", async (req, res) => {
    const { id } = req.params;
    const article = await Article.findByIdAndDelete(id);
    res.json({
        message: "article is deleted successfully"
    })
})

app.listen(PORT, () => {
    console.log(`i'm listening on port ${PORT}`);
})