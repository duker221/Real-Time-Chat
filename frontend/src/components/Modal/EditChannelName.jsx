import React from "react";
import {
  Modal, Button, Spinner, Form
} from "react-bootstrap";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { editChannel, fetchChannels } from "../../slices/channelsSlice";
import { schema } from "../../validate";
import leoProfanity from "../../leoProfanityConfig";

const EditChannelModal = ({
  onClose, isModalOpen, channel, token
}) => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      name: channel ? channel.name : "",
    },
    validationSchema: schema(channels.map((channel) => channel.name)),
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
        console.log(error);
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
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.name && formik.errors.name}
              id="name"
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={onClose}
          disabled={formik.isSubmitting}
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
      </Modal.Footer>
    </Modal>
  );
};

export default EditChannelModal;
