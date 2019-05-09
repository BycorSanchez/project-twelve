import styles from "../styles/Footer.module.css";
import React from "react";

const Footer = () => {
  return (
    <footer>
      <p>
        🖼 from <a href="https://www.pexels.com/">Pexels</a>. With{" "}
        <span className={styles.heart}>♥</span> by{" "}
        <a href="https://twitter.com/bycorsanchez">Bycor</a>
      </p>
    </footer>
  );
};

export default Footer;
