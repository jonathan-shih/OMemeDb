import axios from "axios";
const API_URL = "http://localhost:4000/api/users";
const api = axios.create({ withCredentials: true });

export const likeMeme = async (user, memeID) => {
  const updatedLikedMemes = user.likedMemes;
  updatedLikedMemes.push(memeID);
  const newUser = {
    ...user,
    likedMemes: updatedLikedMemes,
  };
  const response = await api.put(`${API_URL}/${user._id}`, newUser);
  return response;
};

export const unlikeMeme = async (user, memeID) => {
  const updatedLikedMemes = user.likedMemes.filter(
    (curMemeID) => curMemeID !== memeID
  );
  const newUser = {
    ...user,
    likedMemes: updatedLikedMemes,
  };
  const response = await api.put(`${API_URL}/${user._id}`, newUser);
  return response;
};

export const dislikeMeme = async (user, memeID) => {
  const updatedDislikedMemes = user.dislikedMemes;
  updatedDislikedMemes.push(memeID);
  const newUser = {
    ...user,
    dislikedMemes: updatedDislikedMemes,
  };
  const response = await api.put(`${API_URL}/${user._id}`, newUser);
  return response;
};

export const undislikeMeme = async (user, memeID) => {
  const updatedDislikedMemes = user.dislikedMemes.filter(
    (curMemeID) => curMemeID !== memeID
  );
  const newUser = {
    ...user,
    dislikedMemes: updatedDislikedMemes,
  };
  const response = await api.put(`${API_URL}/${user._id}`, newUser);
  return response;
};

export const fetchUserById = async (userID) => {
  const response = await api.get(`${API_URL}/${userID}`);
  return response;
};

export const favoriteMeme = async (user, memeID) => {
  const newUser = {
    ...user,
    favoriteMeme: memeID,
  };
  const response = await api.put(`${API_URL}/${user._id}`, newUser);
  return response;
};

export const unfavoriteMeme = async (user) => {
  const newUser = {
    ...user,
    favoriteMeme: "",
  };
  const response = await api.put(`${API_URL}/${user._id}`, newUser);
  return response;
};

export const updateUser = async (user, email, username, password) => {
  const newUser = {
    ...user,
    email: email,
    username: username,
    password: password,
  };
  const response = await api.put(`${API_URL}/${user.data._id}`, newUser);
  return response;
};
