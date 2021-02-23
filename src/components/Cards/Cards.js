import React, { Component } from "react";
import "./Cards.css";
import { Link, withRouter } from "react-router-dom";

class Cards extends Component {
  handleClick(ID) {
    var layoutStyle = this.props.layout;
    console.log("ID after recieving = " + ID);
    this.props.history.push({
      pathname: "/courses-catalog",
      state: { view: "courses", layout: layoutStyle, id: ID },
    });
  }

  render() {
    var id = this.props.id;
    console.log(`id = ${id}`);
    return (
      <div class='card h-adjust'>
        <img src={this.props.image} class='card-img-top img-height' alt='...' />
        <div class='card-body text-wrap'>
          <h5 class='card-title'>{this.props.title}</h5>
          <p class='card-text'>{this.props.description}</p>
          <div
            class='d-grid gap-2 col-6 mx-auto'
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <a
              href='#'
              class='btn btn-primary '
              onClick={() => {
                this.handleClick(this.props.id);
              }}>
              {this.props.button}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Cards);
