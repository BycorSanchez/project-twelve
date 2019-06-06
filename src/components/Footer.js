import React from "react";
import styles from "../styles/Footer.module.css";
import unsplash from "../images/unsplash.svg";
import iconmonstr from "../images/iconmonstr.svg";

const Footer = () => {
  return (
    <footer>
      <p>Photos from{" "}<a href="https://unsplash.com"><object type="image/svg+xml" data={unsplash} className={styles.icon}>unsplash</object></a></p>
      <p>Icons by <a href="https://iconmonstr.com/"><object type="image/svg+xml" data={iconmonstr} className={styles.icon}>iconmonstr</object></a></p>
      <p>Made with{" "}<span className={styles.heart}>♥</span> by{" "}<a href="https://twitter.com/bycorsanchez">Bycor</a></p>
    </footer>
  );
};

export default Footer;
