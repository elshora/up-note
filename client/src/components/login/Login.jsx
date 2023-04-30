import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login, reset } from "../../features/auth/authSlice";
import Logo from "../../imgs/up-logo.png";
import Spinner from "../Spinner";
import "./login.css";

export default function Login() {
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSuccess, isLoading, message, isloggedIn } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [username, pwd]);
  useEffect(() => {
    setErrMsg(message);
    errRef.current.focus();
  }, [message]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
      dispatch(reset());
    }
  }, [isSuccess, isloggedIn, dispatch, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = { username, password: pwd };
      dispatch(login(userData));
      setUsername("");
      setPwd("");
    } catch (err) {
      console.log(err);
    }
  };

  const content = (
    <section className="container">
      <div className="login py-5 gap-4 d-flex flex-column justify-content-center mx-auto">
        <header className="text-center">
          <img src={Logo} alt="logo" width="50px" />
          <h2 className="display-4 fw-normal">login</h2>
          <p
            ref={errRef}
            className={errMsg ? "text-light bg-danger" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
        </header>
        <main className="py-3">
          <form className="form" onSubmit={handleSubmit}>
            <label className="fs-6" htmlFor="username">
              Username:
            </label>
            <input
              className="form-control border-dark"
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label className="fs-6" htmlFor="password">
              Password:
            </label>
            <input
              className="form-control border border-dark"
              type="password"
              id="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              required
            />
            {isLoading ? (
              <div className="d-flex justify-content-center py-3">
                <Spinner />
              </div>
            ) : (
              <button className="btn btn-outline-warning my-3">Sign In</button>
            )}
            <p className="text-center fs-6 text-secondary">
              Need an account? <br />
              <Link className="text-secondary text-link fs-6" to="/register">
                Register
              </Link>
            </p>
          </form>
        </main>
      </div>
    </section>
  );

  return content;
}
