import html from "../index.html";
import styles from "../styles/styles.scss";

const headerBurger = document.getElementById("burger");
const headerMenu = document.getElementById("header-nav");

headerBurger.addEventListener("click", function (e) {
  e.target.classList.toggle("burger__lines-active");
  headerMenu.classList.toggle("navigation__active");
});
