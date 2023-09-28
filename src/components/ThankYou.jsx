import React from "react";

const ThankYou = ({ setShowThankYou, setshowUserModal }) => {
  return (
    <>
      <h2>A New User Successfully Added!</h2>
      <button
        className="primaryBtn"
        onClick={() => {
          setShowThankYou(false);
          setshowUserModal(false);
        }}
      >
        Close The Modal
      </button>
    </>
  );
};

export default ThankYou;
