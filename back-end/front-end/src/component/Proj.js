import React, { Component } from "react";
// import { useHistory } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Card from "react-bootstrap/Card";
import AOS from "aos";
import state from "./state.png";

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
    AOS.init();
    const project = this.props.project;
    // const gallery = <Gallery index={this.props.location} />;
    let animationDirection = this.props.location % 2 == 1 ? true : false;

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

            <Card
              className="card-div"
              data-aos={`zoom-in-${animationDirection ? "left" : "right"}`}
            >
              <Card.Title className="cardTitle">{project.name}</Card.Title>
              <Card.Img
                variant="top"
                src={project.img}
                onClick={(e) => this.handleClick(e)}
              />
              {/* <div className="project-state">{project.state}</div> */}
              <div className="state-div">
                <img className="state-img" src={state} />
                <div className="state-text">
                  <p>{project.state}</p>
                </div>
              </div>
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
