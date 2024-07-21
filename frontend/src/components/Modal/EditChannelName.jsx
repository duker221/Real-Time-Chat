import React from "react";
import {
  Modal, Button, Spinner, Form
} from "react-bootstrap";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { editChannel, fetchChannels } from "../../slices/channelsSlice";
import leoProfanity from "../../leoProfanityConfig";

const EditChannelModal = ({
  onClose, isModalOpen, channel, token
}) => {
  const { t } = useTranslation();
  const createValidationSchema = (channels) => yup.object().shape({
    name: yup
      .string()
      .trim()
      .required(t("validation.required"))
      .min(3, t("regForm.charactersCount"))
      .max(20, t("regForm.charactersCount"))
      .notOneOf(channels, t("validation.uniqName")),
  });
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);

  const formik = useFormik({
    initialValues: {
      name: channel ? channel.name : "",
    },
    validationSchema: createValidationSchema(
      channels.map((channel) => channel.name)
    ),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        const cleanedName = leoProfanity.clean(values.name);
        await dispatch(
          editChannel({ id: channel.id, token, newName: cleanedName })
        );
        dispatch(fetchChannels(token));
        onClose();
        toast.success(t("modal.editChannel.renameChannelNotification"));
      } catch (error) {
        console.error("Error updating channel:", error);
        toast.error(t("modal.editChannel.errorNotification"));
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Modal show={isModalOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t("modal.editChannel.renameChannel")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="formChannelName">
            <Form.Control
              type="text"
              name="name"
              value={leoProfanity.clean(formik.values.name) || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.name && formik.errors.name}
              id="name"
              className="mb-2"
            />
            <Form.Label className="visually-hidden">
              {t("modal.createChannel.channelName")}
            </Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>

            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
                onClick={onClose}
                disabled={formik.isSubmitting}
                className="me-2"
              >
                {t("modal.createChannel.cancel")}
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={formik.isSubmitting}
                onClick={formik.handleSubmit}
              >
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
    </Modal>
  );
};

export default EditChannelModal;
