import React from "react";
import Enzyme,{ shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16'
import Login from "./Login";

Enzyme.configure({ adapter: new Adapter() });
const wrapper = shallow(<Login />);
describe("Login", () => {
    it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
    test('username check',()=>{
    wrapper.find('input[type="text"]').simulate('change', {target: {name: 'username', value: ''}});
    expect(wrapper.state('username')).toEqual(undefined);
  });
    it('password check',()=>{
    wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: ''}});
    expect(wrapper.state('password')).toEqual(undefined);
  });
    it('has button',()=>{
    wrapper.find('button').simulate('click');
  });
    it('has logo', ()=> {
    expect(wrapper.find('.brand_logo_container')).toHaveLength(1);
  });
  it('login check with right data',()=>{
    wrapper.find('input[type="text"]').simulate('change', {target: {name: 'username', value: 'asdfghjkl@asdf.sdfg'}});
    wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: 'A1234rgy'}});
    wrapper.find('button').simulate('click');
    expect(wrapper.state('formIsValid')).toBe(true);
  });
    it('login check with wrong data',()=>{
    wrapper.find('input[type="text"]').simulate('change', {target: {name: 'username', value: 'krishankantsinghal'}});
    wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: 'krishankant1234'}});
    wrapper.find('button').simulate('click');
    expect(wrapper.state('formIsValid')).toBe(false);
  });
  
});