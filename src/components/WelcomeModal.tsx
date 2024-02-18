import React from "react";
import Modal from "./Modal";
import Image from "next/image";
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
      <br />
      <Image
        className={styles.welcomeLogo}
        alt="Atla logo"
        src="/atla-logo-full.svg"
        width={70}
        height={50}
        priority
      />
    </Modal>
  );
}

export default WelcomeModal;