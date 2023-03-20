import React, { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../features/auth/authSlice";
import { Link } from "react-router-dom";
import "./register.css";
import Logo from "../../imgs/up-logo.png";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
export default function Register() {
  const userRef = useRef();
  const errRef = useRef();

  const dispatch = useDispatch();
  const { isSuccess, message, isLoading } = useSelector((state) => state.auth);

  const [username, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [username, email, pwd, matchPwd]);

  useEffect(() => {
    setErrMsg(message);
  }, [message]);

  const handelSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(username);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = EMAIL_REGEX.test(email);
    if (!v1 || !v2 || !v3) {
      setErrMsg("invalid entery");
      return;
    }
    try {
      dispatch(register({ username, email, password: pwd }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isSuccess ? (
        <section className="register">
          <h1>Success!</h1>
          <Link to="/login">Login</Link>
        </section>
      ) : (
        <section className="container">
          <div className="register gap-4 d-flex flex-column justify-content-center mx-auto">
            <header className="text-center">
              <img src={Logo} alt="logo" width="50px" />
              <h2 className="display-4 fw-normal">Register</h2>
              <p
                ref={errRef}
                className={errMsg ? "text-light bg-danger" : "offscreen"}
                aria-live="assertive"
              >
                {errMsg}
              </p>
            </header>
            <main className="py-3">
              <form onSubmit={handelSubmit} className="form">
                {/* userName field  */}
                <label className="fs-6" htmlFor="username">
                  Username:
                  <span className={validName ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className={validName || !username ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  className="form-control border border-dark"
                  type="text"
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  required
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="uinote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />
                <p
                  id="uinote"
                  className={
                    userFocus && username && !validName
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    className="text-warning bg-dark"
                  />
                  4 - 24 characters. <br />
                  Must begin with a letter. <br />
                  Letters, numbers, underscoresm, hyphens allowed
                </p>
                <label className="fs-6" htmlFor="email">
                  Email:
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validEmail ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validEmail || !email ? "hide" : "invalid"}
                  />
                </label>
                <input
                  className="form-control border border-dark"
                  type="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-invalid={validEmail ? "false" : "true"}
                  aria-describedby="emailnote"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                />
                <p
                  id="emailnote"
                  className={
                    emailFocus && !validEmail ? "instructions" : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  type Email form
                </p>
                <label className="fs-6" htmlFor="password">
                  password:
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validPwd ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validPwd || !pwd ? "hide" : "invalid"}
                  />
                </label>
                <input
                  className="form-control border border-dark"
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                />
                <p
                  id="pwdnote"
                  className={
                    pwdFocus && !validPwd ? "instructions" : "offscreen"
                  }
                >
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    className="text-warning bg-dark"
                  />
                  8 - 24 characters. <br />
                  8 to 24 characters.
                  <br />
                  Must include uppercase and lowercase letters, a number and a
                  special character.
                  <br />
                  Allowed special characters:
                  <span aria-label="exclamation mark">!</span>
                  <span aria-label="at symbol">@</span>
                  <span aria-label="hashtag">#</span>
                  <span aria-label="dollar sign">$</span>
                  <span aria-label="percent">%</span>
                </p>
                <label className="fs-6" htmlFor="confirm_pwd">
                  Confirm Password:
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validMatch && matchPwd ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validMatch || !matchPwd ? "hide" : "invalid"}
                  />
                </label>
                <input
                  className="form-control border border-dark"
                  type="password"
                  id="confirm_pwd"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  value={matchPwd}
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />
                <p
                  id="confirmnote"
                  className={
                    matchFocus && !validMatch ? "instructions" : "offscreen"
                  }
                >
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    className="text-warning bg-dark"
                  />
                  Must match the first password input field.
                </p>
                {isLoading ? (
                  <p>Loading...</p>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    disabled={
                      (!validName || !validEmail || !validPwd, !validMatch)
                        ? true
                        : false
                    }
                  >
                    Sign Up
                  </button>
                )}
                <p className="text-center fs-6 py-1 text-secondary">
                  already Registered?
                  <br />
                  <Link className="text-secondary   text-link fs-6" to="/login">
                    Login
                  </Link>
                </p>
              </form>
            </main>
          </div>
        </section>
      )}
    </>
  );
}
