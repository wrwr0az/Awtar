import React, { Component } from "react";
import { Link } from "react-router-dom";
import projects from "./data";
import Gallery from "./Gallery";
// import { useHistory } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

export default class Proj extends Component {
  handleClick = (e) => {
    e.preventDefault();
    console.log("Clicked");
    console.log(this.props.location);
    // console.log(e.target);
    // let history = useHistory();
    // history.push("/");
    // console.log(e);
    // this.props.handleGallery(this.props.location);
    window.location.href = `/Projects/${this.props.location}`;
  };

  render() {
    const project = this.props.project;
    // const gallery = <Gallery index={this.props.location} />;
    const index = this.props.location;

    return (
      <Router>
        <div className="Proj">
          <div className="div-image">
            <img src={project.img} />
            <div class="overlay" onClick={(e) => this.handleClick(e)}>
              <div class="text">
                {project.name}{" "}
                <p className="inside-flip-image">click for more</p>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}
