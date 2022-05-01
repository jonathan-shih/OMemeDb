import userModel from "./user-model.js";

const findAllUsers = () => {
  return userModel.find();
};
const findUserById = (id) => {
  return userModel.findById(id);
};
const findUserByEmail = (email) => {
  return userModel.findOne({ email });
};
const findUserByCredentials = (email, password) => {
  return userModel.findOne({ email, password });
};
const createUser = (user) => {
  return userModel.create(user);
};
const deleteUser = (id) => {
  return userModel.deleteOne({ _id: id });
};
const updateUser = (id, updatedUser) => {
  return userModel.updateOne({ _id: id }, { $set: updatedUser });
};

export default {
  findAllUsers,
  findUserById,
  findUserByEmail,
  findUserByCredentials,
  createUser,
  deleteUser,
  updateUser,
};
