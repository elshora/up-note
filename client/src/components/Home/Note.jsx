import React from "react";
import "./notes.css";
export default function Note({ note }) {
  return (
    <article className="col-12 col-md-6 col-lg-4  mb-3 ">
      <div className="single-note  p-2 rounded border border-muted">
        <h5 className="border-bottom text-capitalize">{note.title}</h5>
        <div className="content">{note.content}</div>
      </div>
    </article>
  );
}
