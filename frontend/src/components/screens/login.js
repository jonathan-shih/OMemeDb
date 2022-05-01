import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useProfile } from "../contexts/profile-context";
const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const { login } = useProfile();
  const [isValid, setIsValid] = useState(true);
  const handleSignin = async () => {
    try {
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (e) {
      setIsValid(false);
    }
  };
  return (
    <div className="left-text position-relative">
      <h2>Login</h2>
      <div className="left-text">
        Email
        <input
          ref={emailRef}
          placeholder="email"
          className="form-control"
          type="email"
        />
        Password
        <input
          ref={passwordRef}
          placeholder="password"
          className="form-control"
          type="password"
        />
      </div>

      {!isValid && (
        <div className="alert alert-danger alert-dismissible" role="alert">
          <strong>Holy guacamole!</strong> You should check in on some of those
          fields above.
        </div>
      )}
      <div className="d-flex">
        <button onClick={handleSignin} className="btn btn-primary">
          Signin
        </button>
        <div className="pt-2 ps-3">
          Dont have an account? <Link to={"/profile/signup"}>SignUp</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
