import BoardContainer from './BoardContainer';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router, Link } from 'react-router-dom';

describe("BoardContainer", () => {
  it("renders the board title", () => {
    const wrapper = shallow(<BoardContainer />);

    const wrapper = shallow(<Route path='/boards/:id' component={BoardContainer} />);

    expect(
      wrapper.containsMatchingElement(<span>Web Development</span>)
    ).toBe(true);
  });
});
