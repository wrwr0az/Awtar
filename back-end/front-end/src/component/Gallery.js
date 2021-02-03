import React, { Component } from "react";
import Images from "./Images";

export default class Gallery extends Component {
  render() {
    // console.log(this.props.id);
    // console.log(this.props.gallery);
    // console.log(this.props.project.images);
    // console.log(
    //   this.props.project[
    //     parseInt(this.props.match.params.id)
    //   ].images.forEach((e) => console.log(e))
    // );
    // console.log(this.props.match.params.id);
    // console.log(this.props);
    const images = this.props.project[
      parseInt(this.props.match.params.id)
    ].images.map((e, index) => <Images image={e} />);

    return (
      <div className="project-main">
        <div className="Projects">{images}</div>
      </div>
    );
  }
}
