import React from "react";
import ReactDOM from "react-dom";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { removeChannel } from "../../slices/channelsSlice";

const RemoveChannel = ({
  show,
  onHide,
  channelId,
  token,
  onChannelDeleted,
}) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(removeChannel({ id: channelId, token }));
      onChannelDeleted(); // Обновляем состояние после удаления
      toast.success("Канал удален!");
    } catch (error) {
      toast.error("Ошибка при удалении канала!");
      console.error("Ошибка при удалении канала:", error);
    } finally {
      onHide(); // Закрываем модальное окно
    }
  };

  return ReactDOM.createPortal(
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" onClick={onHide} className="me-2">
            Отменить
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Удалить
          </Button>
        </div>
      </Modal.Body>
    </Modal>,
    document.body
  );
};

export default RemoveChannel;
