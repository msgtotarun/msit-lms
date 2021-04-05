import React from "react";
import { shallow } from "enzyme";
import CourseProgress from "./CourseProgress";

describe("CourseProgress", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<CourseProgress />);
    expect(wrapper).toMatchSnapshot();
  });
});
