import React from "react";
import Image from "next/image";
import styles from "@/styles/MainLogo.module.scss";

const open = () => {
  window.open("https://github.com/connellr023/Atla", "_blank");
}

const MainLogo: React.FC = () => {
  return (
    <Image
      className={styles.main}
      alt="Atla logo"
      src="/atla-logo-small.svg"
      width={70}
      height={70}
      onClick={open}
      priority
    />
  );
}

export default MainLogo;