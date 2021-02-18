import React, { Component } from "react";

class LargeCard extends Component {
  render() {
    return (<div class="card mb-3" style={{maxWidth: "540px"}}
>
  <div class="row g-0">
    <div class="col-md-4">
      <img src={this.props.image} alt="..."></img>
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">{this.props.title}</h5>
        <p class="card-text">{this.props.description}</p>
        <button type="button" class="btn btn-outline-primary">{this.props.button}</button>
      </div>
    </div>
  </div>
</div>);
  }
}

export default LargeCard;
