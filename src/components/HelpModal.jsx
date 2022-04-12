import React, { useEffect, useRef } from "react";
import { Modal } from "bootstrap";
import TutorialPane from "./TutorialPane";

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
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-dark" id="helpModalLabel">
                Help
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body m-0 p-0">
              <TutorialPane />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
