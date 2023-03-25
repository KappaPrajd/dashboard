import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { UsersContext } from "./App";

const Delete = ({ userId }) => {
  const { removeUser } = useContext(UsersContext);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleClick = () => {
    fetch(
      `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/${userId}`,
      {
        method: "DELETE",
      }
    ).then(removeUser(userId));
  };

  return (
    <>
      <Button variant="danger" onClick={() => setIsModalVisible(true)}>
        Delete
      </Button>

      <Modal
        show={isModalVisible}
        onHide={() => setIsModalVisible(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this record?
          <div className="mt-4 d-flex justify-content-end gap-3">
            <Button
              variant="outline-warning"
              onClick={() => setIsModalVisible(false)}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleClick}>
              Delete
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Delete;
