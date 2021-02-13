import React, { Component} from 'react'

class ListPrograms extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                {this.props.title}
            </button>
        </h2>
        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
        <div class="card mb-3" style={{maxWidth: "540px"}}>
          <div class="row g-0">
            <div class="col-md-4">
              <img src={this.props.image} alt="..."></img>
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <p class="card-text">{this.props.description}</p>
                <button type="button" class="btn btn-outline-primary">Primary</button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
}
}
export default ListPrograms;
