import React from "react";
import { shallow } from "enzyme";
import CourseStatus from "./CourseStatus";

describe("CourseStatus", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<CourseStatus />);
    expect(wrapper).toMatchSnapshot();
  });
});
