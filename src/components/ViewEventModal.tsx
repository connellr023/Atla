import React from "react";
import Modal from "./Modal";
import EventSchema from "@/shared/EventSchema";
import styles from "@/styles/ViewEventModal.module.scss";

interface ViewEventModalProps
{
  onExit: () => void,
  selectedEvent: EventSchema
}

const ViewEventModal: React.FC<ViewEventModalProps> = ({ onExit, selectedEvent }) => {
  return (
    <Modal onExit={onExit} title={selectedEvent.name}>
      <div><b>Category:</b> {selectedEvent.category.valueOf()}</div>
      <br />
      <br />
      <div><b>Description</b></div>
      <br />
      <div className={styles.description}>{selectedEvent.description}</div>
    </Modal>
  );
}

export default ViewEventModal;