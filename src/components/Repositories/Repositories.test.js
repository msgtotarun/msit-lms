import React from "react";
import { shallow } from "enzyme";
import Repo from "./Repositories";

describe("Repo", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Repo />);
    expect(wrapper).toMatchSnapshot();
  });
});
