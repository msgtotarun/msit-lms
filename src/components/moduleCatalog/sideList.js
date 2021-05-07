import React, { Component } from "react";
import ModuleCatalog from "./moduleCatalog";
let sid = 0;
export default class sideList extends Component {
  componentDidUpdate() {
    sid = 0;
  }
  render() {
    ++sid;
    let colapse = "colapse-" + sid;
    let head = "head-" + sid;

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
            {sid}. {this.props.name}
          </button>
        </h2>
        <div
          id={colapse}
          className='accordion-collapse collapse'
          aria-labelledby={head}
          data-bs-parent='#accordionExample'>
          <div className='accordion-body' id='flow1'>
            <div>
              <li className='sidebar_li'>
                <a
                  className='text-truncate'
                  onClick={() => this.props.desc(this.props.module)}>
                  {"OverView"}
                </a>
              </li>
              {this.props.ModuleList}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
