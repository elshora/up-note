import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="text-center">
      <div className="p-1 fs-6 fw-light" style={{ backgroundColor: "#e6db86" }}>
        © {new Date().getFullYear()}, Up Note made by:&nbsp;
        <Link
          className="text-dark"
          to="https://github.com/elshora"
          target="_blank"
          rel="noreferrer"
        >
          Mahmoud Elshora
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
