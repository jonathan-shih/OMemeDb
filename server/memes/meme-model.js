import mongoose from "mongoose";
import memesSchema from "./meme-schema.js";

const memesModel = mongoose.model("MemesModel", memesSchema);
export default memesModel;
