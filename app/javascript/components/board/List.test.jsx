import List from './List';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router, Link } from 'react-router-dom';

describe("List", () => {
  it("renders the list title", () => {
    const wrapper = shallow(<List cards={[]} id={1} title={"Web Development"} />);

    expect(
      wrapper.contains("Web Development")
    ).toBe(true);
  });

  it("renders the data-id attribute", () => {
    const wrapper = shallow(<List cards={[]} id={1} title={"Web Development"} />);

    expect(
      wrapper.containsMatchingElement(<div id="cards-container" data-id="list-1-cards"></div>)
    ).toBe(true);
  });
});
