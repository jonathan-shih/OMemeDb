import memeDao from "../memes/meme-dao.js";

const findMemeByID = async (req, res) => {
  const memeID = req.params.memeID;
  const meme = await memeDao.findMemeByID(memeID);
  res.json(meme);
};

const likeMeme = async (req, res) => {
  let meme = req.body;
  meme = await memeDao.likeMeme(meme);
  res.json(meme);
};

const unlikeMeme = async (req, res) => {
  let meme = req.body;
  meme = await memeDao.unlikeMeme(meme);
  res.json(meme);
};

const unlikeDislikeMeme = async (req, res) => {
  let meme = req.body;
  meme = await memeDao.unlikeDislikeMeme(meme);
  res.json(meme);
};

const unDislikeLikeMeme = async (req, res) => {
  let meme = req.body;
  meme = await memeDao.unDislikeLikeMeme(meme);
  res.json(meme);
};

export default (app) => {
  app.get("/api/memes/:memeID", findMemeByID);
  app.post("/api/memes/like", likeMeme);
  app.post("/api/memes/unlike", unlikeMeme);
  app.post("/api/memes/unlikeDislike", unlikeDislikeMeme);
  app.post("/api/memes/unDislikeLike", unDislikeLikeMeme);
};
