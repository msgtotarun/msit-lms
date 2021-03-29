import React, { Component } from "react";
let sid = 1;
let id = "";
export default class sideList extends Component {
  getactive(active) {
    if (active === id) {
      return "active";
    }
    return "";
  }
  setSubModule(contents) {
    let ModuleItem = (props) => {
      return (
        <li className='sidebar_li'>
          <button
            className={this.getactive(props.activity)}
            onClick={() => {
              id = props.activity;
              this.props.subModuledesc(props.content);
            }}>
            {props.activity}
          </button>
        </li>
      );
    };
    // console.log('set list modules contents');
    // console.log(contents);
    let moduleToDisplay = contents.map((content) => {
      return (
        <ModuleItem
          content={JSON.stringify(content)}
          key={content.activity_name}
          activity={content.activity_name}></ModuleItem>
      );
    });
    return moduleToDisplay;
  }
  render() {
    sid++;
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
            {this.props.sid}. {this.props.name}
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
                <button
                  key={this.props.key}
                  className={this.getactive(this.props.name)}
                  onClick={() => {
                    id = this.props.name;
                    this.setState({ active: this.props.name });
                    this.props.desc(JSON.stringify(this.props.module));
                  }}>
                  {"OverView"}
                </button>
              </li>
              {this.setSubModule(this.props.moduleContent)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
