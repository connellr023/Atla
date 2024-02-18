import React from "react";
import Modal from "./Modal";
import styles from "@/styles/SuccessModal.module.scss";

interface SuccessModalProps
{
    onExit: () => void,
    title: string,
    message: string
}

const SuccessModal: React.FC<SuccessModalProps> = ({ onExit, title, message }) => {
  return (
    <Modal onExit={onExit} title={title}>
      <br />
      <div className={styles.message}>{message}</div>
    </Modal>
  );
}

export default SuccessModal;