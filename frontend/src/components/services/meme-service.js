import axios from "axios";
const meme_URL = "https://api.imgflip.com/get_memes";
const API_URL = "http://localhost:4000/api/memes";
const api = axios.create({ withCredentials: true });

export const fetchMemesFromAPI = async () => {
  const memes = await axios.get(`${meme_URL}`);
  return memes;
};

export const fetchMemeById = async (memeID) => {
  const response = await api.get(`${API_URL}/${memeID}`);
  return response;
};

export const likeMeme = async (meme) => {
  const response = await api.post(`${API_URL}/like`, meme);
  return response;
};

export const unlikeMeme = async (meme) => {
  const response = await api.post(`${API_URL}/unlike`, meme);
  return response;
};

export const unlikeDislikeMeme = async (meme) => {
  const response = await api.post(`${API_URL}/unlikeDislike`, meme);
  return response;
};

export const unDislikeLikeMeme = async (meme) => {
  const response = await api.post(`${API_URL}/unDislikeLike`, meme);
  return response;
};
