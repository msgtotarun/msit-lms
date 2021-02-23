import React, { Component } from "react";
import './LargeCard.css';

class LargeCard extends Component {
  render() {
    return (
    <div class="card mb-3">
  <div class="row">
    <div class="col-sm-4 col-md-4 col-sm-6">
      <img src={this.props.image} alt="..." class="image-fluid"></img>
    </div>
    <div class="col-sm-8 col-md-8 col-xs-12">
      <div class="card-body">
      <div><h3 class="card-title">{this.props.title}</h3></div>
        <div>
        <p class="card-text">{this.props.description}</p>
        </div>
        </div>
        <div className="button-fix">
        <button type="button" class="btn btn-outline-primary">{this.props.button}</button>
        </div>
        
      
    </div>
  </div>
</div>
);
  }
}

export default LargeCard;
