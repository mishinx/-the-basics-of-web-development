const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const methodOverride = require("method-override");
const postRoutes = require('./routes/blogRoutes');

require("dotenv").config();

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

const app = express();

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(postRoutes);

app.get('/', (req, res) => {
    res.render('index', { title: "Home" });
});

async function start() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log('Connection to MongoDB is successful!');
        app.listen(PORT, () => {
            console.log(`Server is listening on PORT ${PORT}...`);
        });
    } catch (error) {
        console.log("\n Connection error!!! \n\n", error);
    }
}

start();
