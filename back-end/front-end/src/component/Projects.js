import React, { Component } from "react";
// import Gallery from "./Gallery";
import Proj from "./Proj";
// import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";

export default class Projects extends Component {
  constructor() {
    super();
    this.state = {
      gallery: "",
    };
  }

  handleGallery = (e) => {
    this.setState({ gallery: e });
  };

  render() {
    const projects = this.props.projects.map((proj, index) => (
      // {console.log(proj.name)}
      <Proj
        project={proj}
        key={index}
        location={index}
        handleGallery={this.handleGallery}
      />
    ));

    // const gallery = (
    //   <Gallery project={this.props.projects} gallery={this.state.gallery} />
    // );

    return (
      <div className="bgImage">
        {" "}
        <div className="project-main">
          <div className="project-text-header">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
          <div className="Projects">
            <CardDeck className="carddeck-div">{projects}</CardDeck>
          </div>
        </div>
      </div>
    );
  }
}
