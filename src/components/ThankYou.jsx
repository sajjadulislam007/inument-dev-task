import React from "react";

const ThankYou = ({ setShowThankYou, setshowUserModal }) => {
  return (
    <div className="thank-you-message">
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
    </div>
  );
};

export default ThankYou;
