import React from "react";
import { Modal, Button, Spinner, Form, Alert } from "react-bootstrap";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { editChannel } from "../../slices/channelsSlice";
import { fetchChannels } from "../../slices/channelsSlice";
import { schema } from "../../validate";

const EditChannelModal = ({ onClose, isModalOpen, channel, token }) => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);

  const formik = useFormik({
    initialValues: {
      name: channel ? channel.name : "",
    },
    validationSchema: schema(channels.map((channel) => channel.name)),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        await dispatch(
          editChannel({ id: channel.id, token, newName: values.name })
        );
        dispatch(fetchChannels(token));
        onClose();
      } catch (error) {
        console.error("Ошибка при переименовании канала:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Modal show={isModalOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="formChannelName">
            <Form.Control
              type="text"
              name="name"
              placeholder="Введите новое имя"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.name && formik.errors.name}
              
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
            Отменить
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
              "Отправить"
            )}
          </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditChannelModal;
