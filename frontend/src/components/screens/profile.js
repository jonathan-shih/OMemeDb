import React, { useRef, useEffect, useState } from "react";
import * as service from "../services/auth-service";
import { Link, useNavigate } from "react-router-dom";
import { useProfile } from "../contexts/profile-context.js";
import * as userService from "../services/user-service.js";
import * as memeService from "../services/meme-service.js";
import * as commentService from "../services/comment-service.js";
import ProfileDisplay from "./profile-display";

const Profile = () => {
  const { profile } = useProfile();
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const logout = async () => {
    await service.logout();
    navigate("login");
  };

  const checkUser = async () => {
    const curUser = await userService.fetchUserById(profile._id);
    setUser(curUser);
    setEmail(curUser.data.email);
    setUsername(curUser.data.username);
    setPassword(curUser.data.password);
  };

  const handleUpdate = async () => {
    if (!(email === "" || username === "" || password === "")) {
      try {
        await userService.updateUser(user, email, username, password);
        const curUser = await userService.fetchUserById(profile._id);
        setUser(curUser);
      } catch (e) {
        setIsValid(false);
      }
    } else {
      setIsValid(false);
    }
  };

  const profileInfo = ProfileDisplay(profile._id);
  return user ? (
    <div className="wrapper">
      <h2>Profile: {user.data.username}</h2>
      <button className="btn btn-danger" onClick={logout}>
        Logout
      </button>
      <hr />
      <div className="left-text position-relative">
        <div className="left-text">
          Email
          <input
            placeholder="email"
            className="form-control"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          Username
          <input
            placeholder="username"
            className="form-control"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          Password
          <input
            placeholder="password"
            className="form-control"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {!isValid && (
          <div className="alert alert-danger alert-dismissible" role="alert">
            <strong>Holy guacamole!</strong> You should check in on some of
            those fields above.
          </div>
        )}
        <div className="d-flex">
          <button onClick={handleUpdate} className="btn btn-primary">
            Update
          </button>
        </div>
      </div>
      {profileInfo}
    </div>
  ) : (
    ""
  );
};

export default Profile;
