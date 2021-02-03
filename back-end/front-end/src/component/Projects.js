import React, { Component } from "react";
// import Gallery from "./Gallery";
import Proj from "./Proj";
import Card from "react-bootstrap/Card";
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
      <div className="project-main">
        <div className="project-text-header">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
        <div className="Projects">{projects}</div>

        {/* <CardDeck className="carddeck-div">
          <Card className="card-div">
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This card has supporting text below as a natural lead-in to
                additional content.{" "}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This card has even longer content
                than the first to show that equal height action.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
          </Card>
        </CardDeck> */}
      </div>
    );
  }
}
