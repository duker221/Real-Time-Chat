import React from "react";
import ReactDOM from "react-dom";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { removeChannel } from "../../slices/channelsSlice";

const RemoveChannel = ({
  show,
  onHide,
  channelId,
  token,
  onChannelDeleted,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(removeChannel({ id: channelId, token }));
      onChannelDeleted();
      toast.success(t("modal.deleteChannel.sucess"));
    } catch (error) {
      console.error("Ошибка при удалении канала", error);
    } finally {
      onHide();
    }
  };

  return ReactDOM.createPortal(
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t("modal.deleteChannel.deleteChannel")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t("modal.deleteChannel.sure")}</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" onClick={onHide} className="me-2">
            {t("modal.createChannel.cancel")}
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            {t("modal.deleteChannel.delete")}
          </Button>
        </div>
      </Modal.Body>
    </Modal>,
    document.body
  );
};

export default RemoveChannel;
