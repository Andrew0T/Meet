import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import NumberOfEvents from '../NumberOfEvents';

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, test => {
  
  test('When user has not specified a number, 32 is the default number.', ({ given, when, then }) => {

    given('the user has not specified the number of events', async () => {
    });

    let AppWrapper;
    when('the user opens the app', () => {
      AppWrapper = mount(<App />);
    });

    then('the user should see a list of 32 events by default', () => {
      AppWrapper.update();
      expect(AppWrapper.state('numberOfEvents')).toEqual(32);
    });
  });

  test('User can change the number of events they want to see.', ({ given, when, then }) => {
    let AppWrapper;
    given('the list of events is open', () => {
      AppWrapper = mount(<App />);
    });

    when('the user changes the number of events to be displayed', () => {
      AppWrapper.update();
      expect(AppWrapper.find(NumberOfEvents).find('.numberofeventsdata').simulate('change', { target: { value: '1' } }));
    });

    then('the user is shown the choosen number of events', () => {
      AppWrapper.update();
      expect(AppWrapper.find(EventList).prop('events')).toHaveLength(1);    
    });
  });

});
 