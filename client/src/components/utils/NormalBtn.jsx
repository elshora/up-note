import React from "react";
import { NavLink } from "react-router-dom";
export default function NormalBtn({ link, text }) {
  return (
    <NavLink to={link}>
      <button className="px-2 py-1 border text-capitalize">{text}</button>
    </NavLink>
  );
}
