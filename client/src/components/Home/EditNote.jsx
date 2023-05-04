import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Spinner";
import {
  getNotes,
  reset,
  updateOneNote,
} from "../../features/notes/notesSlice";
import "./addNote.css";
export default function EditNote({ note }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const { isSuccess, message, isLoading } = useSelector((state) => state.notes);
  const errRef = useRef();
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.content);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [title, text]);

  useEffect(() => {
    setErrMsg(message);
  }, [message]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
    }
  }, [isSuccess, dispatch]);

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        updateOneNote({
          _id: note._id,
          auther: user,
          title,
          content: text,
        })
      );
      await dispatch(getNotes(`${user}`));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="text-center container">
      <p>{errMsg}</p>
      <div className="d-flex flex-column gap-3 note-form mx-auto">
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
            aria-invalid={title.length > 0 ? "false" : "true"}
            aria-describedby="titlenote"
            onChange={(e) => setTitle(e.target.value)}
            defaultValue={note.title}
            className="px-3 py-2 border border-muted"
          />

          <textarea
            type="text"
            placeholder="Text"
            required
            aria-invalid={title.length > 0 ? "false" : "true"}
            aria-describedby="textnote"
            onChange={(e) => setText(e.target.value)}
            defaultValue={note.content}
            rows={5}
            className="px-3 py-2 border border-muted mb-3"
          />

          {isLoading ? (
            <Spinner />
          ) : (
            <button className="btn bg-warning text-white display-1">
              Update
            </button>
          )}
        </form>
      </div>
    </section>
  );
}
