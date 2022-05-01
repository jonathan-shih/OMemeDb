import mongoose from "mongoose";

const memesSchema = mongoose.Schema(
  {
    name: String,
    memeID: { type: String },
    url: String,
    likes: { type: Number, default: 0 },
  },
  { collection: "memes" }
);
export default memesSchema;
