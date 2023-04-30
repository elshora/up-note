import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotes } from "../../features/notes/notesSlice";
import Empty from "./Empty";
import Notes from "./Notes";
import AddNote from "./AddNote";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { notes } = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNotes(`${user}`));
  }, []);

  return (
    <main>
      <AddNote />
      <section className="container">
        {notes.length !== 0 ? <Notes notes={notes} /> : <Empty />}
      </section>
    </main>
  );
}
