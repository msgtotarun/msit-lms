import React, { Component } from "react";
import {Link,withRouter} from "react-router-dom";
import './LargeCard.css'

class LargeCard extends Component {
  constructor(props){
    super(props);
  }

  handleClick(ID){
    var layoutStyle = this.props.layout;
    console.log('ID after recieving = '+ID);
    this.props.history.push({
  pathname: '/courses-catalog',
    state: { view: 'courses',layout:layoutStyle,
    id: ID
    }
  })
  }

  render()
  {
    return (<div class="card mb-3 pad" style={{maxWidth: "540px"}}>
      <div class="row g-0">
        <div class="col-md-4">
          <img class="image" src={this.props.image} alt="..."></img>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{this.props.title}</h5>
            <p class="card-text text-prop">{this.props.description}</p>
            <button type="button" class="btn btn-outline-primary pos" onClick={()=>{this.handleClick(this.props.id)}}>{this.props.button}</button>
          </div>
        </div>
      </div>
    </div>);

  }
}

export default withRouter(LargeCard);
