import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import './list-programs.css';

var content = null;
var id = 0;
class ListPrograms extends Component {
  constructor(props) {
    super(props);
  }

  handleListClick(ID) {
    var layoutStyle = this.props.layout;
    console.log('list-programs ID after recieving = ' + ID);
    console.log(`list view prop = ${this.props.view}`);
    if (this.props.view === 'programs') {
      console.log(`list id inside if = ${ID}`);
      // localStorage.setItem('program', ID);
      this.props.history.push({
        pathname: '/courses-catalog/'+ID,
        state: { view: 'courses', layout: layoutStyle }
      })
    } else {
      this.props.history.push({
        pathname: "/modulesCatalog/" + ID,
      });
    }
  }

  render() {
    // console.log('inside list programs component');
    // console.log('props in list-programs is as follows');
    // console.log(this.props);

    if (this.props.view === "modules") {
      return (
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              {this.props.title}
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">

            <div className="accordion-body" id="flow1">
              <div>
                {this.props.description}
              </div>
              <button type="button" className="btn btn-outline-primary" onClick={() => { this.handleListClick(this.props.id) }} style={{ float: "right" }}>{this.props.button}</button>

            </div>

          </div>
        </div>
      );
    }

    ++id;
    let colapse = "colapse" + id;
    let head = "head" + id;

    return (
      <div className='accordion-item'>
        <h2 className='accordion-header' id={head}>
          <button
            className='accordion-button collapsed'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target={`#${colapse}`}
            aria-expanded='false'
            aria-controls={colapse}>
            {this.props.title}
          </button>
        </h2>
        <div
          id={colapse}
          className='accordion-collapse collapse'
          aria-labelledby={head}
          data-bs-parent='#accordionExample'>
          <div className='accordion-body' id='flow1'>
            <div>
              <img className='flow-image' src={this.props.image} alt='' />
            </div>
            <div>
              <p className='flow2'>{this.props.description}</p>
            </div>
            <button
              type='button'
              className='btn btn-outline-primary'
              onClick={() => {
                this.handleListClick(this.props.id);
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
