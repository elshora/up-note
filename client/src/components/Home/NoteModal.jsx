import { faClose, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOneNote,
  getNotes,
  reset,
} from "../../features/notes/notesSlice";
import "./notes.css";
const NoteModal = ({ note, onEdit }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [show, setShow] = useState(false);
  const toggleModal = () => setShow(!show);
  const { isSuccess, message, isLoading } = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const handelDelete = async () => {
    await dispatch(deleteOneNote(note._id));
    await dispatch(getNotes(`${user}`));
  };
  useEffect(() => {
    if (isSuccess) {
      setShow(false);
      dispatch(reset());
    }
  }, [isSuccess, dispatch]);
  return (
    <>
      <Button variant="outline-warning" onClick={toggleModal} className="w-100">
        View Note
      </Button>

      <Modal size="lg" show={show} onHide={toggleModal} centered scrollable>
        <Modal.Header className="mx-1">
          <Modal.Title>{note.title}</Modal.Title>
        </Modal.Header>
        <p className="text-white bg-danger">{message}</p>
        <Modal.Body>{note.content}</Modal.Body>

        <Modal.Footer className="p-0 border border-warning rounded m-1 d-flex justify-content-between">
          <div>
            {isLoading ? (
              <Spinner />
            ) : (
              <Button variant="none" onClick={handelDelete}>
                <FontAwesomeIcon icon={faTrash} className="text-danger" />
              </Button>
            )}
            <Button variant="none" onClick={onEdit}>
              <FontAwesomeIcon icon={faEdit} className="text-muted" />
            </Button>
            <p className="timestamp mx-1 text-center text-muted fw-light d-inline-block">
              {new Date(note.updatedAt).toLocaleString()}
            </p>
          </div>
          <Button variant="none" onClick={toggleModal}>
            <FontAwesomeIcon icon={faClose} className="text-danger" />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NoteModal;
