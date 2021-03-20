import React, { Component } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../NavBar/NavBar";
var token = null;

class ModulesCatalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: null,
      loading: false,
    };
  }

  componentDidMount() {
    token = localStorage.getItem("token");
    let courseId = window.location.pathname.replace("/modules-catalog/", "");
    // console.log("cid " + courseId);

    let link = `${process.env.REACT_APP_APIBASE_URL}/api/content/get/content-json/${courseId}/?token=${token}`;
    console.log(link);
    fetch(link, {
      method: "get",
    })
      .then((response) => response.text())
      .then((result) => {
        var json = JSON.parse(result);
        // console.log(json.contentJSON[0]);
        json.contentJSON[0] ?? this.setState({ list: json.contentJSON });
      })
      .catch((error) => console.log("error", error));
  }

  render() {
    return (
      <>
        <Navbar />
      </>
    );
  }
}

export default ModulesCatalog;
