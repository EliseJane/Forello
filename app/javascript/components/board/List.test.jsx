import List from './List';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router, Link } from 'react-router-dom';

describe("List", () => {
  it("renders the list title", () => {
    const wrapper = shallow(<List title={"Web Development"} />);

    expect(
      wrapper.contains("Web Development")
    ).toBe(true);
  });
});
