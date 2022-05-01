import mongoose from "mongoose";
import commentsSchema from "./comment-schema.js";

const commentModel = mongoose.model("CommentsModel", commentsSchema);

export default commentModel;
