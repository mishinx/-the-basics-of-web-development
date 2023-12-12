let express = require("express");
let app = express();
let PORT = process.env.PORT || 3000;
let path = require('path')
let methodOverride = require("method-override");
let postRoutes = require('./routes/blogRoutes');
let mongoose = require("mongoose");

require("dotenv").config();

let db = "mongodb+srv://m1shinx:54542424m@cluster0.rtax1xi.mongodb.net/Node-blog";

//let db = process.env.MONGO_URL;
//let PORT = process.env.PORT;

mongoose.connect(db);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({extended: false}))
app.use(methodOverride("_method"));
app.use(postRoutes);

app.get('/',(req,res)=>{
    res.render('index',{title: "Home"});
});



async function start() {
    try {
        await mongoose.connect(db);
        console.log('Connection to MongoDB is success!');
        app.listen(PORT, () => {
            console.log(`Server is listening PORT ${PORT}...`);
        });
    } catch (error) {
        console.log("\n Connection erorr!!! \n\n", error);
    }
}
start();