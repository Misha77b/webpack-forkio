import html from "../index.html";
import styles from "../styles/styles.scss";
var headerBurger = document.getElementById("burger");
var headerMenu = document.getElementById("header-nav");
headerBurger.addEventListener("click", function (e) {
  e.target.classList.toggle("burger__lines-active");
  headerMenu.classList.toggle("navigation__active");
});