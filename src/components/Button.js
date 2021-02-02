import React, { Component } from 'react';

var Button = (props) => {
  return(<button type="button" className={props.classes}>props.text</button>);
}

export default Button;
