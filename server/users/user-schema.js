import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    email: { type: String },
    username: { type: String },
    password: { type: String },
    favoriteMeme: { type: String },
    likedMemes: { type: Array },
    dislikedMemes: { type: Array },
  },
  { collection: "users" }
);
export default schema;
