import React from "react";
import { shallow } from "enzyme";
import Repositories from "./Repositories";

describe("Repositories", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Repositories />);
    expect(wrapper).toMatchSnapshot();
  });
});
