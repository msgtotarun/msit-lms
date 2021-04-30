import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import dompurify from "dompurify";
import "./list-programs.css";
var id = 0;
var img = "";
class ListPrograms extends Component {
  constructor(props) {
    super(props);
    this.Image();
  }

  handleListClick(ID) {
    var layoutStyle = this.props.layout;
    console.log("list-programs ID after recieving = " + ID);
    console.log(`list view prop = ${this.props.view}`);
    if (this.props.view === "programs") {
      console.log(`list id inside if = ${ID}`);
      // localStorage.setItem('program', ID);
      this.props.history.push({
        pathname: "/courses-catalog/" + ID,
        state: { view: "courses", layout: layoutStyle },
      });
    } else {
      window.location =
        "/modulesCatalog/" +
        this.props.programId +
        "/" +
        this.props.courseId +
        "/" +
        ID;
    }
  }

  Image() {
    img = `data:image/jpeg;base64,${this.props.image}`;
  }

  render() {
    // console.log('inside list programs component');
    // console.log('props in list-programs is as follows');
    // console.log(this.props);

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
            <h6 id='courseDescription'>Course Description</h6>
            <div className='list-body'>
              <div
                id='list-body-id'
                dangerouslySetInnerHTML={{
                  __html: dompurify.sanitize(this.props.description),
                }}
              />
              <img className='flow-image' src={img} />
            </div>
            <button
              type='button'
              className='btn button1 list-button'
              onClick={() => {
                this.handleListClick(this.props.id);
              }}>
              {this.props.button}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(ListPrograms);
