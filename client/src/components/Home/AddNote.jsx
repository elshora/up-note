import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faNoteSticky } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

export default function AddNote() {
  const { isSuccess, message, isLoading } = useSelector((state) => state.notes);
  const [toggleForm, setToggleForm] = useState(false);

  const [title, setTitle] = useState("");
  const [validTitle, setValidTitle] = useState(false);
  const [titleFocus, setTitleFocus] = useState(false);

  const [text, setText] = useState("");
  const [validText, setValidText] = useState(false);
  const [textFocus, setTTextFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [title, text]);
  return (
    <section className="text-center container my-5 ">
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
          <form className="mx-auto w-100">
            <input type="text" placeholder="title" autoComplete="off" />
            <textarea type="text" placeholder="Text" />
            <button>post Note</button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setToggleForm(!toggleForm)}
          className="btn btn-warning text-white px-5 fw-semibold fs-5"
        >
          New Note <FontAwesomeIcon icon={faNoteSticky} />
        </button>
      )}
    </section>
  );
}
