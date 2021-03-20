import React from "react";
import { shallow } from "enzyme";
import ModulesCatalog from "./modules-catalog";

describe("ModulesCatalog", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<ModulesCatalog />);
    expect(wrapper).toMatchSnapshot();
  });
});
