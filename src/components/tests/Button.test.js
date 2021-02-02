import Button from '../Button';
import React from "react";
import { mount,configure } from "enzyme";
import "@testing-library/jest-dom/extend-expect";
import Adapter from "enzyme-adapter-react-16";
import { queryByText, render, getByTestId, screen, fireEvent, cleanup } from '@testing-library/react';

// configure({ adapter: new Adapter() });

describe("Button Testing", () => {

  let wrapper;
  var classes = 'btn btn-outline-primary';
  var text = 'click';
  it('render the button',() => {
		render(<Button classes={classes} text={text} />);

		expect(screen.findByText(/click/)).toBeInTheDocument();
	});
});
