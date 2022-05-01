import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import authController from "./controllers/auth-controller.js";
import userController from "./controllers/user-controller.js";
import memeController from "./controllers/meme-controller.js";
import commentController from "./controllers/comment-controller.js";

mongoose.connect(
  "mongodb+srv://jonshih:123aabbcc@cluster0.6gab2.mongodb.net/final-proj?retryWrites=true&w=majority"
);

const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(
  session({
    secret: "SECRETO",
    cookie: { secure: false },
  })
);
app.use(express.json());

authController(app);
userController(app);
memeController(app);
commentController(app);

app.get("/", (request, response) => {
  response.send("Welcome to WebDev");
});

app.listen(process.env.PORT || 4000);
