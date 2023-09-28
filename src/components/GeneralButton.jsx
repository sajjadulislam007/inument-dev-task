import React from "react";

const GeneralButton = ({ title, customClass, action }) => {
  return (
    <button className={`primaryBtn ${customClass ? customClass : null}`} onClick={action}>
      {title}
    </button>
  );
};

export default GeneralButton;
