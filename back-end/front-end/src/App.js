import "./App.css";
import "./AOS.css";
import React from "react";
import Menu from "./component/Menu";
import Home from "./component/Home";
import Projects from "./component/Projects";
import Services from "./component/Services";
import projects from "./component/data";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Gallery from "./component/Gallery";
import Messages from "./component/Messages";
import Login from "./component/login/Login";

import { useTranslation } from "react-i18next";

function App() {
  // class App extends Component {
  //   constructor() {
  //     super();
  //     this.state = {
  //       gallery: "j",
  //     };
  //   }

  // const [gallery, setGallery] = React.useState("j");

  // const handleGallery = (gallery) => {
  //   console.log(gallery);
  //   this.setState({ gallery });
  // };

  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = React.useState(i18n.language);

  const handelLang = (lang) => {
    setCurrentLang(lang);
  };

  // render() {
  const data = projects;
  return (
    <div className="main-div">
      <Router>
        <div className="App">
          <Menu handelLang={handelLang} />
        </div>

        <div className="component bgImage">
          {/* <Route exact path="/" component={Home} /> */}

          <Route
            exact
            path="/"
            render={(props) => (
              <Home component={Home} currentLang={currentLang} />
            )}
          />

          <Route
            exact
            path="/Projects"
            render={(props) => (
              <Projects
                component={Projects}
                projects={data}
                // handleGallery={handleGallery}
              />
            )}
          />
          {/* <Route exact path="/Contact" component={contact} /> */}
          <Route exact path="/Services" component={Services} />
          {/* <Route
            path="/Projects/:id"
            component={Gallery}
            gallery={this.state.gallery}
          /> */}

          <Route
            exact
            path="/Projects/:id"
            render={(props) => <Gallery project={data} {...props} />}
          />

          <Route exact path={`/Messages`} component={Messages} />
          <Route path="/login" render={(props) => <Login />} />
        </div>
      </Router>
    </div>
  );
}
// }

export default App;
