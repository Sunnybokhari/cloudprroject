import React, { useState } from "react";
import Modal from "./Modal";
import "./Task.css";

const Task = ({ id, title, description, dueDate, priority, status, fileUrl }) => {
  console.log(id);
    const [isModalOpen, setModalOpen] = useState(false);

    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };

    const handleDelete = (id) => {
      fetch(`http://localhost:3001/task-delete/${id}`, {
          method: "DELETE",
          credentials: "include",
      })
      .then((response) => {
          if (!response.ok) {
              throw new Error("Network response was not ok");
          }
          window.location.reload(); 
      })
      .catch((error) => {
          console.error("Error:", error);
      });
  };

    return (
        <div className="task">
            <h3>{title}</h3>
            <p>{description}</p>
            <p>Due Date: {dueDate}</p>
            <p>Priority: {priority}</p>
            <p>Status: {status}</p>
            {fileUrl && (
                <button onClick={toggleModal} className="view-attachment-btn">
                    View Attachment
                </button>
            )}
<button onClick={() => handleDelete(id)} className="task-done-btn">
    Task Done
</button>

            <Modal isOpen={isModalOpen} onClose={toggleModal}>
                <iframe
                    src={fileUrl}
                    title="Attachment"
                    className="attachment-iframe"
                    allowFullScreen
                />
            </Modal>
        </div>
    );
};

export default Task;
