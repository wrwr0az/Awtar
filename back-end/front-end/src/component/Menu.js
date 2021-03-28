import React from "react";
// import Cookies from "js-cookie";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "./awtarlogo.jpg";
import { logOutCallback } from "../api";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

function Menu(props) {
  // class Menu extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       currentLang: "",
  //     };
  //   }

  // render() {

  const { t, i18n } = useTranslation();
  const [currentLang, setCurrentLang] = React.useState(i18n.language);
  // console.log(t);
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    props.handelLang(lang);
    setCurrentLang(lang);
  };

  const logout = () => {
    logOutCallback();
  };

  let history = useHistory();

  return (
    <Navbar className="nav-bar bColor" expand="lg" fixed="top">
      <img className="logo" src={logo} alt="" />
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav menu">
        <Nav className="mr-auto menu-nav">
          {i18n.language === "en" ? (
            <>
              <Nav.Link className="menu-button" to="" href="/#Home">
                {t("nav.btn1")}
              </Nav.Link>
              <Nav.Link as={Link} className="menu-button" to="/Projects">
                {t("nav.btn2")}
              </Nav.Link>
              <Nav.Link className="menu-button" to="" href="/#contact-section">
                {t("nav.btn3")}
              </Nav.Link>
              <Nav.Link as={Link} className="menu-button" to="/services">
                {t("nav.btn4")}
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} className="menu-button" to="/services">
                {t("nav.btn4")}
              </Nav.Link>

              <Nav.Link className="menu-button" to="" href="/#contact-section">
                {t("nav.btn3")}
              </Nav.Link>
              <Nav.Link as={Link} className="menu-button" to="/Projects">
                {t("nav.btn2")}
              </Nav.Link>
              <Nav.Link className="menu-button" to="" href="/#Home">
                {t("nav.btn1")}
              </Nav.Link>
            </>
          )}

          <div className="languages-div">
            <Nav.Link
              as={Link}
              className="menu-button"
              onClick={() => changeLanguage("en")}
              style={
                currentLang === "en"
                  ? { backgroundColor: "rgba(83, 87, 90, 0.7)" }
                  : { backgroundColor: "transparent" }
              }
              to="#"
            >
              EN
            </Nav.Link>
            <Nav.Link
              as={Link}
              className="menu-button"
              onClick={() => changeLanguage("ar")}
              style={
                currentLang === "ar"
                  ? { backgroundColor: "rgba(83, 87, 90, 0.7)" }
                  : { backgroundColor: "transparent" }
              }
              to="#"
            >
              عربي
            </Nav.Link>
          </div>

          <Nav.Link
            className="Logout"
            onClick={() => {
              logout();
              props.handelSetUser("");
              history.push("/Login");
              localStorage.removeItem("token");
            }}
          >
            Logout
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Menu;
