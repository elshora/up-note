import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const NoteModal = ({ note, onClose, onEdit }) => {
  const [show, setShow] = useState(false);

  const toggleModal = () => setShow(!show);

  return (
    <>
      <Button variant="outline-warning" onClick={toggleModal} className="w-100">
        View Note
      </Button>

      <Modal size="lg" show={show} onHide={toggleModal} centered scrollable>
        <Modal.Header closeButton>
          <Modal.Title>{note.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{note.content}</Modal.Body>
        <Modal.Footer className="p-0 border border-warning rounded m-1 d-flex justify-content-center">
          <Button variant="none" onClick={toggleModal}>
            <FontAwesomeIcon icon={faTrash} className="text-danger" />
          </Button>
          <Button variant="none" onClick={onEdit}>
            <FontAwesomeIcon icon={faEdit} className="text-muted" />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NoteModal;
