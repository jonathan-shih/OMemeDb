import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as service from "../services/auth-service.js";

const SignUp = () => {
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [err, setError] = useState(false);

  const signup = () => {
    if (
      !(
        emailRef.current.value === "" ||
        usernameRef.current.value === "" ||
        passwordRef.current.value === ""
      )
    ) {
      service
        .signup(
          emailRef.current.value,
          usernameRef.current.value,
          passwordRef.current.value
        )
        .then(() => navigate("/"))
        .catch((e) => setError(true));
    } else {
      setError(true);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      Email
      <input
        ref={emailRef}
        type="email"
        placeholder="email"
        className="form-control"
      />
      Username
      <input
        ref={usernameRef}
        type="text"
        placeholder="username"
        className="form-control"
      />
      Password
      <input
        ref={passwordRef}
        type="password"
        placeholder="password"
        className="form-control"
      />
      {err && (
        <div className="alert alert-danger alert-dismissible" role="alert">
          <strong>Holy guacamole!</strong> You should check in on some of those
          fields above.
        </div>
      )}
      <div className="d-flex">
        <button className="btn btn-primary" onClick={signup}>
          Signup
        </button>
        <div className="pt-2 ps-3">
          Already have an account? <Link to={"/profile/login"}>Login</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
