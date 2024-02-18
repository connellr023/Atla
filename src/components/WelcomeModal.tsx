import React from "react";
import Modal from "./Modal";
import Image from "next/image";
import styles from "@/styles/WelcomeModal.module.scss";

interface WelcomeModalProps
{
    onExit: () => void,
    title: string
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onExit, title }) => {
  return (
    <Modal onExit={onExit} title={title}>
      <br />
      <div className={styles.message}>Your Hub for Volunteering Events and more, Alta aims to bring the Calgarian community together by providing a centralized platform to post and view volunteering events.</div>
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