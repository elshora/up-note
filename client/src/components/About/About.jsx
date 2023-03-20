import React from "react";
import NormalBtn from "../utils/NormalBtn";
import MainHeading from "./MainHeading";
import SubTitle from "./SubTitle";
import Paragraph from "./Pragrah";

export default function About() {
  let btns = [
    { link: "/contact", text: "Contact Us" },
    { link: "/home", text: "home" },
  ];
  return (
    <>
      <div className="container">
        <div className="topsection ">
          <MainHeading title="Up Note" />
          <SubTitle subTitle="Store Your Thoughts" />
          <Paragraph minParagraph="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui modi voluptatem quam, impedit saepe consequuntur explicabo corrupti, tenetur possimus natus consectetur similique exercitationem ut hic ex soluta, sapiente voluptatibus quia?" />
          <div className="container d-flex gap-3 justify-content-center">
            {btns.map((btn, index) => (
              <NormalBtn key={index} link={btn.link} text={btn.text} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
