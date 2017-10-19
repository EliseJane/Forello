import CardTile from './CardTile';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router, Link } from 'react-router-dom';

describe("CardTile", () => {
  it('it renders title of card', () => {
    const card = {id: 1, title: 'First Card', labels: [], comments_count: 0}
    const wrapper = shallow(<CardTile card={card}/>);

    expect(
      wrapper.contains("First Card")
    ).toBe(true);
  });

  it('it renders labels when they exist', () => {
    const card = {id: 1, title: 'First Card', labels: ['green'], comments_count: 0}
    const wrapper = shallow(<CardTile card={card}/>);

    expect(
      wrapper.containsMatchingElement(<div className="card-label green colorblindable"></div>)
    ).toBe(true);
  });

  it('it does not render labels when they do not exist', () => {
    const card = {id: 1, title: 'First Card', labels: [], comments_count: 0}
    const wrapper = shallow(<CardTile card={card}/>);

    expect(
      wrapper.containsMatchingElement(<div className="card-label green colorblindable"></div>)
    ).toBe(false);
  });

  it('it renders description icon when contains description', () => {
    const card = {id: 1, title: 'First Card', labels: ['green'], comments_count: 0, description: 'test'}
    const wrapper = shallow(<CardTile card={card}/>);

    expect(
      wrapper.containsMatchingElement(<i className="description-icon sm-icon"></i>)
    ).toBe(true);
  });

  it('it does not render description icon when no description', () => {
    const card = {id: 1, title: 'First Card', labels: ['green'], comments_count: 0}
    const wrapper = shallow(<CardTile card={card}/>);

    expect(
      wrapper.containsMatchingElement(<i className="description-icon sm-icon"></i>)
    ).toBe(false);
  });

  it('it renders due date icon when contains due date', () => {
    const card = {id: 1, title: 'First Card', labels: ['green'], comments_count: 0, due_date: "2017-10-18"}
    const wrapper = shallow(<CardTile card={card}/>);

    expect(
      wrapper.containsMatchingElement(<i className="clock-icon sm-icon overdue-recent completed">2017-10-18</i>)
    ).toBe(true);
  });

  it('it does not render due date icon when no due date', () => {
    const card = {id: 1, title: 'First Card', labels: ['green'], comments_count: 0}
    const wrapper = shallow(<CardTile card={card}/>);

    expect(
      wrapper.containsMatchingElement(<i className="clock-icon sm-icon overdue-recent completed">2017-10-18</i>)
    ).toBe(false);
  });

  it('it renders comments icon when comments count greater than 0', () => {
    const card = {id: 1, title: 'First Card', labels: ['green'], comments_count: 2}
    const wrapper = shallow(<CardTile card={card}/>);

    expect(
      wrapper.containsMatchingElement(<i className="comment-icon sm-icon"></i>)
    ).toBe(true);
  });

  it('it does not render comments icon when no comments count 0', () => {
    const card = {id: 1, title: 'First Card', labels: ['green'], comments_count: 0}
    const wrapper = shallow(<CardTile card={card}/>);

    expect(
      wrapper.containsMatchingElement(<i className="comment-icon sm-icon"></i>)
    ).toBe(false);
  });
});
