import logo from "./logo.svg";
import "./App.css";
import "./AOS.css";
import React, { Component } from "react";
import Menu from "./component/Menu";
import Home from "./component/Home";
import Projects from "./component/Projects";
import contact from "./component/Contact";
import Services from "./component/Services";
import projects from "./component/data";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Gallery from "./component/Gallery";
import Messages from "./component/Messages";
import Alert from "react-bootstrap/Alert";
import Login from "./component/login/Login";

class App extends Component {
  constructor() {
    super();
    this.state = {
      gallery: "j",
    };
  }

  handleGallery = (gallery) => {
    console.log(gallery);
    this.setState({ gallery });
  };

  render() {
    const data = projects;
    return (
      <div className="main-div">
        <Router>
          <div className="App">
            <Menu />
          </div>

          <div className="component">
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/Projects"
              render={(props) => (
                <Projects
                  component={Projects}
                  projects={data}
                  handleGallery={this.handleGallery}
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
}

export default App;
