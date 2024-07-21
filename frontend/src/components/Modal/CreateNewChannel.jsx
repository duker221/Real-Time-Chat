import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import {
  Modal, Button, Spinner, Form
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import leoProfanity from "../../leoProfanityConfig";

import { createChannels, fetchChannels } from "../../slices/channelsSlice";

const NewChannelModal = ({
  onClose,
  isModalOpen,
  channelNames,
  token,
  lastChannel,
}) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);
  const validationSchema = (channels) => yup.object().shape({
    name: yup
      .string()
      .trim()
      .required(t("validation.required"))
      .min(3, t("regForm.charactersCount"))
      .max(20, t("validation.maxCount"))
      .notOneOf(channels, t("validation.uniqName")),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: validationSchema(channels.map((channel) => channel.name)),
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        const cleanedName = leoProfanity.clean(values.name);
        await dispatch(createChannels({ name: cleanedName, token }));

        lastChannel(channels.length);
        dispatch(fetchChannels(token));
        onClose();
        toast.success(t("modal.createChannel.channelCreated"));
      } catch (error) {
        console.error(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("modal-open");
      document.body.style.overflow = "hidden";
      document.body.setAttribute("data-rr-ui-modal-open", "true");
    } else {
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "";
      document.body.removeAttribute("data-rr-ui-modal-open", "true");
    }
    return () => {
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "";
      document.body.removeAttribute("data-rr-ui-modal-open", "true");
    };
  }, [isModalOpen]);

  return ReactDOM.createPortal(
    <Modal show={isModalOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t("modal.createChannel.addChannel")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              name="name"
              className={`form-control mb-2 ${
                formik.errors.name && formik.touched.name ? "is-invalid" : ""
              }`}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoFocus="autofocus"
              id="name"
            />
            <Form.Label htmlFor="name" className="visually-hidden">
              {t("modal.createChannel.channelName")}
            </Form.Label>
            {formik.errors.name && formik.touched.name && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.name}
              </Form.Control.Feedback>
            )}
            <div className="d-flex justify-content-end mt-2">
              <Button variant="secondary" onClick={onClose} className="me-2">
                {t("modal.createChannel.cancel")}
              </Button>
              <Button variant="primary" onClick={formik.handleSubmit}>
                {formik.isSubmitting ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  t("modal.createChannel.send")
                )}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>,
    document.body
  );
};

export default NewChannelModal;
