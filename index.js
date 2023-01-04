import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";

import { verifyToken } from "./middleware/auth.js";
import { register, login, forgetPass } from "./controllers/employees.js";
import { createUser } from "./controllers/users.js";
import { createMember } from "./controllers/members.js";

// App configurations
dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('assets'));
app.set('view engine', 'ejs');


// Database connection
mongoose.set('strictQuery', true);
mongoose.connect("mongodb://127.0.0.1:27017/courier-router");

const upload = multer({ dest: "public/uploads/" });

// routes
app.post("/register", upload.single("avatar"), register);
app.post("/login", login);
app.post("/forgetPass", forgetPass);
app.post("/member", createMember);
app.post("/userPackage", createUser);

app.get("/", (req, res) => {
    res.render("admin/admin-home")
})

app.listen(3000, () => console.log(`Server running on port 3000`));




// TODO: Admin home user input patterns for registeration and login form