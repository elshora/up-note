import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotes } from "../../features/notes/notesSlice";
import Empty from "./Empty";
import AddNote from "./AddNote";
import Note from "./Note";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { notes } = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNotes(`${user}`));
  }, [user, dispatch]);

  return (
    <main>
      <AddNote />
      <section className="container my-5">
        {notes?.length !== 0 ? (
          <div className="row">
            {notes?.map((note, index) => (
              <Note key={index} note={note} />
            ))}
          </div>
        ) : (
          <Empty />
        )}
      </section>
    </main>
  );
}
