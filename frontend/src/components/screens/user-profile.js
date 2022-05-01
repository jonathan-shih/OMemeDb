import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import ProfileDisplay from "./profile-display";
import * as userService from "../services/user-service";

const UserProfile = () => {
  const { userID } = useParams();
  const ProfileInfo = ProfileDisplay(userID);
  const [user, setUser] = useState();
  const checkUser = async () => {
    const curUser = await userService.fetchUserById(userID);
    setUser(curUser);
  };
  useEffect(() => {
    checkUser();
  }, []);
  return (
    <div>
      {user && (
        <div className="wrapper">
          <h2>Profile: {user.data.username}</h2>
          {ProfileInfo}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
