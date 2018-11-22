import styles from "../styles/Clock.module.css";
import React from "react";

const Clock = () => (
  <div className={styles.clock}>
    <span className={[styles.line, styles.hours].join(" ")} />
    <span className={[styles.line, styles.minutes].join(" ")} />
    <span className={styles.clockCenter} />
  </div>
);

export default Clock;
