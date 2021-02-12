import React from "react";
import { shallow } from "enzyme";
import LargeCard from "./LargeCard";

describe("LargeCard", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<LargeCard />);
    expect(wrapper).toMatchSnapshot();
  });
});
