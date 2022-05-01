import mongoose from "mongoose";
const commentsSchema = mongoose.Schema(
  {
    comment: String,
    memeID: String,
    memeName: String,
    username: String,
    commenter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
  },
  { collection: "comments" }
);

export default commentsSchema;
