import React, { Component } from "react";
import ImageGallery from "react-image-gallery";
import data from "./data";

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

    /*
    const images = this.props.project[
      parseInt(this.props.match.params.id)
    ].images.map((e, index) => <Images image={e} />);
*/
    let imageArray = [];
    data[parseInt(this.props.match.params.id)].images.forEach((e) => {
      imageArray.push({
        original: `${e}?width=1000&height=500`,
        thumbnail: `${e}?width=250&height=150`,
        description: "PLAPLAPLA",
      });
    });

    console.log(imageArray);

    return (
      <div className="project-main">
        <ImageGallery items={imageArray} />
      </div>
    );
  }
}
