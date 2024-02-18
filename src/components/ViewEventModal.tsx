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
  // Helper function to convert URLs in text to clickable links
  const renderClickableLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, (url) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`);
  };

  return (
    <Modal onExit={onExit} title={selectedEvent.name}>
      <div><b>Category:</b> {selectedEvent.category.valueOf()}</div>
      <br />
      <br />
      <div><b>Description</b></div>
      <br />
      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: renderClickableLinks(selectedEvent.description) }} // We love danger these days
      />
    </Modal>
  );
};

export default ViewEventModal;