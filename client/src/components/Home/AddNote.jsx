import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faInfoCircle,
  faNoteSticky,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Spinner";
import { AddNewNote, getNotes, reset } from "../../features/notes/notesSlice";
import { useNavigate } from "react-router-dom";
import "./addNote.css";

export default function AddNote() {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess, message, isLoading } = useSelector((state) => state.notes);
  const [toggleForm, setToggleForm] = useState(false);
  const errRef = useRef();
  const [title, setTitle] = useState("");
  const [titleFocus, setTitleFocus] = useState(false);
  const [text, setText] = useState("");
  const [textFocus, setTextFocus] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [title, text]);

  useEffect(() => {
    setErrMsg(message);
  }, [message]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/home");
      dispatch(reset());
      setText("");
      setTitle("");
    }
  }, [isSuccess, dispatch, navigate]);

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(AddNewNote({ auther: user, title, content: text }));
      await dispatch(getNotes(`${user}`));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="text-center container my-5 note-form">
      {toggleForm ? (
        <div className="d-flex flex-column gap-3">
          <div>
            <button
              onClick={() => setToggleForm(!toggleForm)}
              className="d-block btn btn-outline-danger ms-auto"
            >
              <FontAwesomeIcon icon={faClose} />
            </button>
          </div>
          <h2 className="display-4 fw-normal">Add New Note</h2>
          <p
            ref={errRef}
            className={errMsg ? "text-light bg-danger" : "d-none"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <form className="mx-auto w-100" onSubmit={handelSubmit}>
            <input
              type="text"
              placeholder="Your Note Title"
              required
              value={title}
              aria-invalid={title.length > 0 ? "false" : "true"}
              aria-describedby="titlenote"
              onFocus={() => setTitleFocus(true)}
              onBlur={() => setTitleFocus(false)}
              onChange={(e) => setTitle(e.target.value)}
              className="px-3 py-2 border border-muted"
            />
            <p
              id="titlenote"
              className={titleFocus ? "instructions" : "d-none"}
            >
              <FontAwesomeIcon
                icon={faInfoCircle}
                className="text-warning bg-dark"
              />
              Title Shouldn't be empty
            </p>
            <textarea
              type="text"
              placeholder="Text"
              value={text}
              required
              aria-invalid={title.length > 0 ? "false" : "true"}
              aria-describedby="textnote"
              onFocus={() => setTextFocus(true)}
              onBlur={() => setTextFocus(false)}
              onChange={(e) => setText(e.target.value)}
              rows={5}
              className="px-3 py-2 border border-muted mb-3"
            />
            <p id="titlenote" className={textFocus ? "instructions" : "d-none"}>
              <FontAwesomeIcon
                icon={faInfoCircle}
                className="text-warning bg-dark"
              />
              Text Shouldn't be empty
            </p>
            <button className="btn bg-warning text-white display-1">
              {isLoading ? <Spinner /> : "Post"}
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setToggleForm(!toggleForm)}
          className="btn btn-warning text-white px-5 fw-semibold fs-5"
        >
          New Note <FontAwesomeIcon icon={faNoteSticky} /> <br />
        </button>
      )}
    </section>
  );
}
