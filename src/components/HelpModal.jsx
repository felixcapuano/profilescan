import React, { useEffect, useRef } from "react";
import { Modal } from "bootstrap";

const HelpModal = ({ toggle = false, setToggle }) => {
  const modalRef = useRef();

  useEffect(() => {
    const modal = new Modal(modalRef.current);

    toggle ? modal.toggle() : modal.hide();

    // what is the correct one : hidden.bs.modal or hide.bs.modal ????
    modalRef.current.addEventListener("hide.bs.modal", function (e) {
      if (setToggle) setToggle(false);
    });
  });

  return (
    <div>
      <div
        className="modal fade"
        id="helpModal"
        tabIndex="-1"
        aria-labelledby="helpModalLabel"
        aria-hidden="false"
        ref={modalRef}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="helpModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                // onClick={() => setToggle && setToggle(false)}
              ></button>
            </div>
            <div className="modal-body">...</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
