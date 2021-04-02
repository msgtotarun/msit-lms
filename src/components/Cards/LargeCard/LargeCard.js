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
        // localStorage.setItem('program',ID);
          this.props.history.push({
        pathname: '/courses-catalog/'+ID,
          state: { view: 'courses',layout:layoutStyle}
        })
      }else {
      window.location = "/modulesCatalog/"+ID;
    }
  }

  render() {

    return (
      <div class='card mb-3 pad'>
        <div class='row g-0'>
            <img class='image col-md-4' src={this.props.image} alt='...'></img>
          <div class='col'>
            <div class='card-body position-relative'>
              <h5 class='card-title'>{this.props.title}</h5>
              <hr></hr>
              <p class='card-text text-prop'>{this.props.description}</p>
              <button onClick={() => {
                  this.handleClick(this.props.id);
                }}
                type="button" class="btn btn-outline-primary btn-md bottom-0 end-0">Enter</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LargeCard);
