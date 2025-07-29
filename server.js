/*-------------------- Configuration ---------------------*/

const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require('express-session');

const authController = require('./controllers/auth.js');
const itemsController = require('./controllers.items.js')

const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');

const port = process.env.PORT ? process.env.PORT : "3000";

/*-------------------- DB ---------------------*/

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

/*-------------------- Dependencies ---------------------*/
app.use(express.urlencoded({extended: false}));
app.use(methodOverride("_method"));
app.use(morgan('dev'));

app.use(methodOverride("_method"));
app.use(morgan('dev'));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passUserToView);
app.use("/auth", authController); // may need to modify this later with multiple users (see cookbook lab)
app.use(isSignedIn);
app.use('/users/:userId/items', itemsController);



/*-------------------- Routes ---------------------*/
app.get("/", async (req,res) => {
    res.render("index.ejs", { user: req.session.user, })   
});




/*-------------------- Port ---------------------*/
app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
