import React from "react";

export default function Paragraph({ minParagraph }) {
  return (
    <>
      <div className="my-3">
        <h6 className="text-center mx-auto text-secondary fw-normal fs-5">
          {minParagraph}
        </h6>
      </div>
    </>
  );
}
