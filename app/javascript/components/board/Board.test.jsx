import Board from './Board';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router, Link } from 'react-router-dom';

describe("Board", () => {
  it("renders the board title", () => {
    const wrapper = shallow(<Board title="Web Development" lists={[]} />);

    expect(
      wrapper.contains("Web Development")
    ).toBe(true);
  });
});
