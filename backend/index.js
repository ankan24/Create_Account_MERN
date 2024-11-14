const express = require("express");
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const url =
    "mongodb+srv://demouser:demo123@cluster0.ap4zayq.mongodb.net/Login?retryWrites=true&w=majority&appName=Cluster0";
mongoose
    .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB Atlas!");
    })
    .catch((error) => {
        console.error("MongoDB Atlas connection error:", error);
    });

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const User = mongoose.model("User", userSchema);



app.use(cors());
app.use(bodyParser.json());

app.post("/demo", async (req, res) => {
    let user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    const doc = await user.save();

    // console.log(req.body);
    // res.json(req.body);
    console.log(doc);
    res.json(doc);
    // res.send('Hello World');
});

app.get("/demo", async (req, res) => {
    let docs = await User.find({});
    console.log(docs);
    res.json(docs);
});

app.listen(8080, () => {
    console.log("listening on http://localhost :8080");
});
