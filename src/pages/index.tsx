import React from "react";
import styles from "@/styles/Home.module.scss";

class Home extends React.Component {
  public render = () => {
    return (
      <main className="flex-wrapper">
        <div className={styles.wrapper}>
          <h1>Home Page</h1>
        </div>
      </main>
    );
  }
}

export default Home;