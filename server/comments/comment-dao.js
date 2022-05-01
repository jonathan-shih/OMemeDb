import commentModel from "./comment-model.js";

const postComment = async (userId, memeId, comment) => {
  comment.commenter = userId;
  comment.memeID = memeId;
  const actualComment = await commentModel.create(comment);
  return actualComment;
};

const findCommentsByMemeID = (memeID) => commentModel.find({ memeID });

const findCommentsByUserId = (userId) =>
  commentModel.find({ commenter: userId });

export default {
  postComment,
  findCommentsByMemeID,
  findCommentsByUserId,
};
