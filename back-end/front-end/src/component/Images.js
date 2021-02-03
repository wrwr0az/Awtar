import React, { Component } from "react";

export default class Images extends Component {
  render() {
    console.log(this.props.image);
    return (
      <div className="Proj">
        <div className="div-image">
          <img src={this.props.image} />
        </div>
      </div>
    );
  }
}
