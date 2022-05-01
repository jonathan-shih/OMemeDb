import axios from "axios";
const API_URL = "http://localhost:4000/api/memes";
const api = axios.create({ withCredentials: true });

export const postComment = async (userID, memeID, comment) => {
  const response = await api.post(
    `${API_URL}/${memeID}/comments/${userID}`,
    comment
  );
  return response.data;
};

export const findCommentsByMemeID = async (memeID) => {
  const response = await api.get(`${API_URL}/${memeID}/comments`);
  return response.data;
};

export const findCommentsByUserId = async (userId) => {
  const response = await api.get(
    `http://localhost:4000/api/users/${userId}/comments`
  );
  return response.data;
};
