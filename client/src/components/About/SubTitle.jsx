// <h6  className='my-2 text-center'></h6>
import React from "react";

export default function SubTitle({ subTitle }) {
  return (
    <>
      <div className="mb-1">
        <h6 className="text-center text-muted fw-light">{subTitle}</h6>
      </div>
    </>
  );
}
