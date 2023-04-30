import React from "react";
import EmptyImg from "../../imgs/empty.png";

export default function Empty() {
  return (
    <div className="container my-5">
      <div className="row text-center">
        <div className="col">
          <h1>Welcome to Up note!</h1>
          <p>You don't have any notes yet.</p>
          <img src={EmptyImg} alt="empty vector" className="mw-100" />
        </div>
      </div>
    </div>
  );
}
