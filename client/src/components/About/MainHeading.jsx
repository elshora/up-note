import React from "react";

export default function MainHeading({ title }) {
  return (
    <>
      <div className="mt-3">
        <h1 className="text-center display-5 text-capitalize">{title}</h1>
      </div>
    </>
  );
}
