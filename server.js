const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const Register = require("./controllers/register");
const SignIn = require("./controllers/signin");
const Profile = require("./controllers/profile");
const Image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    connectionString: "process.env.DATABASE_URL",
    ssl: true
  }
});

console.log(process.env);

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("App is working!");
});

app.get("/profile/:id", (req, res) => {
  Profile.handleProfile(req, res, db);
});

app.post("/signin", (req, res) => {
  SignIn.handleSignIn(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  Register.handleRegister(req, res, db, bcrypt);
});

app.put("/image", (req, res) => {
  Image.handleImage(req, res, db);
});

app.post("/imageurl", (req, res) => {
  Image.handleApiCall(req, res);
});

app.listen(process.env.PORT || 3100, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});
