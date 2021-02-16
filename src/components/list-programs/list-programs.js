import React, { Component} from 'react'
import './list-programs.css';

class ListPrograms extends Component{
  render(){
    return (
        <div className="accordion-item">
        <h2 className="accordion-header" id="headingOne">
          <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            Accordion Item #1
          </button>
        </h2>
        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
    
          <div className="accordion-body" id="flow1">
              <div>
                  <img classNameName="flow" src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHw%3D&auto=format&fit=crop&w=500&q=60" />
              </div>
            <div>
            <p className="flow2"><strong>This is the first item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classNamees that we use to style each element. These classNamees control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.</p>
            </div>
              <button type="button" className="btn btn-outline-primary" style="float: right;">Primary</button>
              
          </div>
          
        </div>
      </div>
    );
}
}
export default ListPrograms;