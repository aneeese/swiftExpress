import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { verifyToken } from "./middleware/auth.js";
import { register, login } from "./controllers/employees.js";
import { createUser } from "./controllers/users.js";
import { createMember } from "./controllers/members.js";

// App configurations
dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded( {extended: true} ));
app.set('view engine', 'ejs');
app.use(express.static("public"));

// Database connection
mongoose.set('strictQuery', true);
mongoose.connect("mongodb://127.0.0.1:27017/courier-router");

// routes
app.get("/", (req, res) => {
    res.send("Server, Hello!")
})

app.post("/register", register);
app.post("/login", login);
app.post("/member", createMember);
app.post("/userPackage", createUser);

app.listen(3000, () => console.log(`Server running on port 3000`));