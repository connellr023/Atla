import React from "react";
import Modal from "./Modal";
import styles from "@/styles/WelcomeModal.module.scss";

interface WelcomeModalProps
{
    onExit: () => void,
    title: string,
    message: string
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onExit, title, message }) => {
  return (
    <Modal onExit={onExit} title={title}>
      <br />
      <div className={styles.message}>{message}</div>
    </Modal>
  );
}

export default WelcomeModal;