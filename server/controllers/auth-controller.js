import userDao from "../users/user-dao.js";

const signup = async (req, res) => {
  const newUser = req.body;
  const existingUser = await userDao.findUserByEmail(req.body.email);
  if (existingUser) {
    res.sendStatus(403);
    return;
  } else {
    const insertedUser = await userDao.createUser(newUser);
    req.session.profile = insertedUser;
    res.json(insertedUser);
  }
};

const login = async (req, res) => {
  const existingUser = await userDao.findUserByCredentials(
    req.body.email,
    req.body.password
  );
  if (existingUser) {
    req.session.profile = existingUser;
    res.send(existingUser);
  } else {
    res.sendStatus(403);
  }
};

const profile = (req, res) => {
  const currentUser = req.session.profile;
  if (currentUser) {
    res.json(currentUser);
  } else {
    res.sendStatus(503);
  }
};
const logout = (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
};

const findUsers = (req, res) => {
  res.json(users);
};

export default (app) => {
  app.post("/api/auth/signup", signup);
  app.post("/api/auth/profile", profile);
  app.post("/api/auth/login", login);
  app.post("/api/auth/logout", logout);
  app.get("/api/auth/users", findUsers);
};
