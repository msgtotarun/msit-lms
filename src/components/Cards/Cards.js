import React, { Component } from "react";
import "./Cards.css";
import { withRouter } from "react-router-dom";
class Cards extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // var id = this.props.id;
    // console.log(`id = ${id}`);
    return (
      <div class='card flow'>
        <div class='card-body'>
          <h5 class='card-title'>{this.props.name}</h5>
        </div>
        <img src={this.props.image} class='card-img-top' />
        <div class='card-body'>
          <p class='fs-4 text-center'>{this.props.contact}</p>
        </div>
      </div>
    );
  }
}

export default withRouter(Cards);
