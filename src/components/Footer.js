import styles from "../styles/Footer.module.css";
import React from "react";
import pexels from "../images/pexels.svg";
import icons from "../images/iconmonstr.svg";

const Footer = () => {
  return (
    <footer>
      <p>Photos from{" "}<a href="https://www.pexels.com/"><img className={styles.icon}  src={pexels} alt="pexels"/></a></p>
      <p>Icons by <a href="https://iconmonstr.com/"><img className={styles.icon} src={icons} alt="iconmonstr"/></a></p>
      <p>Made with{" "}<span className={styles.heart}>♥</span> by{" "}<a href="https://twitter.com/bycorsanchez">Bycor</a></p>
    </footer>
  );
};

export default Footer;
