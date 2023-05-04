import React from "react";
import NoteModal from "./NoteModal";
import "./notes.css";
export default function Note({ note }) {
  return (
    <article className="col-12 col-md-6 col-lg-4  mb-3 ">
      <div className="single-note  p-2 rounded border border-muted">
        <h5 className="py-1 border-bottom text-capitalize">{note.title}</h5>
        <div className="content">{note.content}</div>
        <p className="text-center text-muted fw-light border-top">
          {new Date(note.updatedAt).toLocaleString()}
        </p>
        <NoteModal note={note} />
      </div>
    </article>
  );
}
