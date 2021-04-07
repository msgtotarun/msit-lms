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
      <div className='card mb-3 pad'>
        <div className='row g-0'>
          <div className='col'>
            <div className='card-body position-relative'>
              <h5 className='card-title'>{this.props.title}</h5>
              <hr></hr>
              <div dangerouslySetInnerHTML={{ __html: this.props.description}} />
              <a onClick={() => {
                  this.handleClick(this.props.id);
                }}
                type="button" className="stretched-link"></a>            
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LargeCard);
