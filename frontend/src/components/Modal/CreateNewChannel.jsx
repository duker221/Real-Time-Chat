import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import { Modal, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import leoProfanity from "../../leoProfanityConfig";
import { schema } from "../../validate";
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
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: schema(channelNames),
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        const cleanedName = leoProfanity.clean(values.name);
        const data = await dispatch(
          createChannels({ name: cleanedName, token })
        );

        lastChannel(channels.length);
        dispatch(fetchChannels(token));
        onClose();
        toast.success("Канал создан!");
      } catch (error) {
        console.log(error);
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
        <form onSubmit={formik.handleSubmit}>
          <input
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
          <div className="invalid-feedback">{formik.errors.name}</div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          {t("modal.createChannel.cancel")}
        </Button>
        <Button
          variant="primary"
          onClick={formik.handleSubmit}
          disabled={!formik.isValid || formik.isSubmitting}
        >
          {formik.isSubmitting ? (
            <Spinner animation="border" size="sm" />
          ) : (
            t("modal.createChannel.send")
          )}
        </Button>
      </Modal.Footer>
    </Modal>,
    document.body
  );
};

export default NewChannelModal;
