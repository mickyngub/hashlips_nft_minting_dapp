import React from "react";

const Modal = ({ description, isOpen, children, img, onButtonClose }) => {
  return (
    (isOpen && (
      <div className="modal">
        <div className="modal-content">
          <div className="modal-img">{img}</div>
          <div className="modal-description">{description}</div>
          <div className="modal-button">{children}</div>
        </div>
      </div>
    )) ||
    null
  );
};
export default Modal;
