import React from "react";
import { shallow } from "enzyme";
import Repo from "./Repo";

describe("Repo", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Repo />);
    expect(wrapper).toMatchSnapshot();
  });
});
