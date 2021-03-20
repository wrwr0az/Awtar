import React, { Component } from "react";
// import { useHistory } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Card from "react-bootstrap/Card";

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

    return (
      <Router>
        <div className="Proj">
          <div className="div-image">
            {/* <img src={project.img} />
            <div class="overlay" onClick={(e) => this.handleClick(e)}>
              <div class="text">
                {project.name}{" "}
                <p className="inside-flip-image">click for more</p>
              </div>
            </div> */}

            <Card className="card-div">
              <Card.Title className="cardTitle">{project.name}</Card.Title>
              <Card.Img
                variant="top"
                src={project.img}
                onClick={(e) => this.handleClick(e)}
              />
              <Card.Body>
                <Card.Text className="cardText">{project.details}</Card.Text>
              </Card.Body>
              {/* <Card.Footer>
                      <small className="text-muted">Last updated 3 mins ago</small>
                    </Card.Footer> */}
            </Card>
          </div>
        </div>
      </Router>
    );
  }
}
