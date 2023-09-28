import React from "react";

const Modal = ({ children, customClass, userModalPopupRef }) => {
  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content" ref={userModalPopupRef}>
          <div className={`modal-content-inner ${customClass ? customClass : ""}`}>
            <div className="modal-body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
