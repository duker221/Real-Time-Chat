import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ReactDOM from "react-dom";
import * as yup from "yup";
import { Button, Form, InputGroup, Modal as BsModal } from "react-bootstrap";

const schema = yup.object().shape({
  name: string()
    .trim()
    .required("validation.required")
    .min(3, "validation.min")
    .max(20, "validation.max")
    .notOneOf(channels, "validation.uniq"),
});

const NewChannelModal = ({ onClose, isModalOpen }) => {
  const body = document.body;
  const changeBodyIfModalOpen = () => {
    body.classList.add("modal-open");
    body.style.overflow = "hidden";
    body.setAttribute("data-rr-ui-modal-open", "");
  };

  const removeBodyStyle = () => {
    body.classList.remove("modal-open");
    body.style.overflow = "";
    body.removeAttribute("data-rr-ui-modal-open", "");
  };

  useEffect(() => {
    if (isModalOpen) {
      changeBodyIfModalOpen();
    } else {
      removeBodyStyle();
    }
    return () => {
      removeBodyStyle();
    };
  }, [isModalOpen]);

  return ReactDOM.createPortal(
    <>
      <div className="fade modal-backdrop show"></div>
      <div
        role="dialog"
        aria-modal="true"
        className="fade modal show"
        tabIndex={-1}
        style={{ display: "block" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title h4">Добавить канал</div>
              <button
                type="button"
                aria-label="Close"
                data-bs-dismiss="modal"
                className="btn btn-close"
                onClick={onClose}
              ></button>
              <div className="modal-body"></div>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};

export default NewChannelModal;
