import CreateListTileForm from './CreateListTileForm';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router, Link } from 'react-router-dom';

describe("CreateListTileForm", () => {
  it("renders closed form when showForm attribute is false", () => {
    const wrapper = shallow(
      <CreateListTileForm
        showForm={false} />
    );

    expect(
      wrapper.find('#new-list').hasClass('selected')
    ).toBe(false);
  });

  it("renders open form when showForm attribute is true", () => {
    const wrapper = shallow(
      <CreateListTileForm
        showForm={true} />
    );

    expect(
      wrapper.find('#new-list').hasClass('selected')
    ).toBe(true);
  });

  it("renders non-disabled save button when title is not empty", () => {
    const wrapper = shallow(
      <CreateListTileForm
        showForm={true}
        title='test'
      />
    );

    expect(
      wrapper.containsMatchingElement(<input disabled={false} />)
    ).toBe(true);
  });

  it("renders disabled save button when title is empty", () => {
    const wrapper = shallow(
      <CreateListTileForm
        showForm={true}
        title=''
      />
    );

    expect(
      wrapper.containsMatchingElement(<input disabled={true} />)
    ).toBe(true);
  });
});
