import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
  let event, EventWrapper;
  beforeAll(() => {
    event = mockData[0];
    EventWrapper = shallow(<Event event={mockData[0]} />);
  });

  test('by default event details not rendered', () => {
    expect(EventWrapper.find('.about')).toHaveLength(0);
  });

  test('render summary details of event', () => {
    expect(EventWrapper.find('.summary')).toHaveLength(1);
    expect(EventWrapper.find('.summary').text()).toBe(event.summary);
  });

  test('render location details about event', () => {
    expect(EventWrapper.find('.location')).toHaveLength(1);
    expect(EventWrapper.find('.location').text()).toBe(event.location);
  });

  test('render start time of event', () => {
    expect(EventWrapper.find('.start')).toHaveLength(1);
    expect(EventWrapper.find('.start').text()).toBe(event.start.dateTime);
  });

  test('render show button to show about event', () => {
    expect(EventWrapper.find('.show-about')).toHaveLength(1);
  });

  test('render hide button to hide about event', () => {
    expect(EventWrapper.find('.hide-about')).toHaveLength(0);
  });

  test('render about event when button is clicked', () => {
    EventWrapper.find('.show-about').at(0).simulate('click');  
    expect(EventWrapper.find('.about')).toHaveLength(1);
  });

  test('render details when user clicks show about button', () => {
    EventWrapper.setState({aboutVisible: true });
    expect(EventWrapper.find('.about-title')).toHaveLength(1);
    expect(EventWrapper.find('.about-link')).toHaveLength(1);
    expect(EventWrapper.find('.description')).toHaveLength(1);
  });

  test('render hide details when user clicks hide about button', () => {
    EventWrapper.setState({aboutVisible: true });
    EventWrapper.find('.hide-about').at(0).simulate('click');
    expect(EventWrapper.find('.about')).toHaveLength(0);
  });

});