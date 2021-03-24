import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./LargeCard.css";

class LargeCard extends Component {
  constructor(props){
    super(props);
  }

  handleClick(ID){
    var layoutStyle = this.props.layout;
    console.log('ID after recieving = '+ID);
    console.log(`card view prop = ${this.props.view}`);
    if(this.props.view ==='programs')
    {
      console.log(`card id inside if ${ID}`);
        localStorage.setItem('program',ID);
          this.props.history.push({
        pathname: '/courses-catalog',
          state: { view: 'courses',layout:layoutStyle}
        })
      }else {
      this.props.history.push({
        pathname: "/module-catalog/" + ID,
      });
    }
  }

  render() {

    if (this.props.view === "modules"){
      return (<div class="card text-center">
  <div class="card-header">
    {this.props.title}
  </div>
  <div class="card-body">
    {this.props.description}
    <button type="button" class="btn btn-outline-primary" onClick={()=>{this.handleClick(this.props.id)}}>{this.props.button}</button>
  </div>
</div>);
    }

    return (
      <div class='card mb-3 pad'>
        <div class='row g-0'>
          <div class='col-md-4'>
            <img class='image' src={this.props.image} alt='...'></img>
          </div>
          <div class='col-md-8'>
            <div class='card-body'>
              <h5 class='card-title'>{this.props.title}</h5>
              <hr></hr>
              <p class='card-text text-prop'>{this.props.description}</p>
              <a
                href='#'
                onClick={() => {
                  this.handleClick(this.props.id);
                }}
                class='stretched-link'></a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LargeCard);
