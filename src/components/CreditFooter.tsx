import React from "react";
import styles from "@/styles/CreditFooter.module.scss";

const CreditFooter: React.FC = () => {
  return (
    <footer className={styles.credit}>
      &copy; Connell Reffo and Tara Strickland 2024
    </footer>
  );
}

export default CreditFooter;