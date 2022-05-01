import commentDao from "../comments/comment-dao.js";

const postComment = async (req, res) => {
  const comment = req.body;
  const memeID = req.params.memeID;
  const userID = req.params.userID;
  console.log("test");
  const insertedComment = await commentDao.postComment(userID, memeID, comment);
  res.json(insertedComment);
};

const findCommentsByMemeId = async (req, res) => {
  const memeID = req.params.memeID;
  const comments = await commentDao.findCommentsByMemeID(memeID);
  res.json(comments);
};

const findCommentsByUserId = async (req, res) => {
  const userId = req.params.userId;
  const comments = await commentDao.findCommentsByUserId(userId);
  res.json(comments);
};

export default (app) => {
  app.post("/api/memes/:memeID/comments/:userID", postComment);
  app.get("/api/memes/:memeID/comments", findCommentsByMemeId);
  app.get("/api/users/:userId/comments", findCommentsByUserId);
};
