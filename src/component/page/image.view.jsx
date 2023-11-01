import React, { Component } from "react";
import ImageList from "../lists/image_list";
import NavbarMain from "../assets/navbar";

export default class ImageView extends Component {
  render() {
    return (
      <div>
        <NavbarMain/>
        <br/>
        <ImageList />
      </div>
    );
  }
}
