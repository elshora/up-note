import React from "react";

export default function Empty() {
  return (
    <div className="container my-5">
      <div className="row text-center">
        <div className="col">
          <h1>Welcome to your notes app!</h1>
          <p>You don't have any notes yet.</p>
          <button className="btn btn-primary ">Create a new note</button>
        </div>
      </div>
    </div>
  );
}
