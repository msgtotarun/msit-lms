
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./list-programs.css";
var id = 0;
class ListPrograms extends Component {
  handleListClick(ID) {
    var layoutStyle = this.props.layout;
    console.log("list-programs ID after recieving = " + ID);
    console.log(`list view prop = ${this.props.view}`);
    if (this.props.view === "programs") {
      console.log(`list id inside if = ${ID}`);
      localStorage.setItem("program", ID);
      this.props.history.push({
        pathname: "/courses-catalog",
        state: { view: "courses", layout: layoutStyle },
      });
    } else {
    }
  }

  render() {
    id++;
    return (
      <div className='accordion-item'>
        <h2 className='accordion-header' id={"head" + id}>
          <button
            className='accordion-button'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target={`#colapse${id}`}
            aria-expanded='false'
            aria-controls={"colapse" + id}>
            {this.props.title}
          </button>
        </h2>
        <div
          id={"colapse" + id}
          className='accordion-collapse collapse'
          aria-labelledby={"head" + id}
          data-bs-parent='#accordionExample'>
          <div className='accordion-body' id='flow1'>
            <div>
              <img className='flow' src={this.props.image} alt='' />
            </div>
            <div>
              <p className='flow2'>{this.props.description}</p>
            </div>
            <button
              type='button'
              className='btn btn-outline-primary'
              onClick={() => {
                this.handleListClick(this.props.ID);
              }}
              style={{ float: "right" }}>
              {this.props.button}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(ListPrograms);
