import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,Link } from "react-router-dom";
import { login, reset } from "../../features/auth/authSlice"; 

export default function Login() {
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const {  isSuccess ,isLoading, message } = useSelector((state) => state.auth);
  
  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setErrMsg('')
  }, [username,pwd]);
  useEffect(() => {
    setErrMsg(message)
    errRef.current.focus();
  }, [message]);
  
  useEffect(() => {
    if(isSuccess)  {
      navigate("/")
    dispatch(reset())
}
  }, [isSuccess]);
    
  const handleSubmit =async (e)=>{
e.preventDefault()
try {
  const userData = {username,password:pwd}
  dispatch(login(userData))
  setUsername('');
  setPwd('');
} catch (err) {
console.log(err);
}
}
  
  const content = (<section className="public">
    <header>
    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <h1>login</h1>
    </header>
    <main className="login">
      <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="username">
              Username:
            </label>
      <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
      <label htmlFor="password">
      Password:
            </label>
      <input
              type="password"
              id="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              required
            />
             { isLoading?  <p>loading...</p>:
            <button className="btn btn-outline-dark">Sign In</button>}
        <p className="text-center">Need an account? <br />
        <span className="line">
        <Link to='/register'>Register</Link>
        </span>
        </p>
    </form>
    </main>
  </section>)

  return content
}
