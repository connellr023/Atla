import React from "react";
import styles from "@/styles/Modal.module.scss";

interface ModalProps
{
  onExit: () => void,
  title: string,
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ onExit, title, children }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.background}>
        <div className={styles.content}>
          <div className={styles.title}><b>{title}</b></div>
          <img className={styles.exit} onClick={onExit} src="/exit.png" alt="exit" />
          <br />
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;