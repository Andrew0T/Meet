import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount } from 'enzyme';
import App from '../App';
import { mockData } from '../mock-data';

const feature = loadFeature('./src/features/showHideEventDetails.feature');

defineFeature(feature, test => {
  
  test('An event element is collapsed by default.', ({ given, when, then }) => {
    let AppWrapper;
    given('the list of events is open', async () => {
      AppWrapper = await mount(<App />);
      AppWrapper.update();
      expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
    });

    when('the user scrolls though the list of events', () => {

    });

    then('the event details should be hidden', () => {
      expect(AppWrapper.find('.event .about')).toHaveLength(0);

    });
  });

  test('User can expand an event to see its details.', ({ given, when, then }) => {
    
    let AppWrapper;
    given('the list of events should be open', async () => {
      AppWrapper = await mount(<App />);
      AppWrapper.update();
      expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
    });

    when('the user clicks on show button', () => {
      AppWrapper.update();
      AppWrapper.find('.event .show-about').at(0).simulate('click');
    });

    then('the user should be shown the clicked event details', () => {
      expect(AppWrapper.find('.event .about')).toHaveLength(1);
    });
  });

  test('User can collapse an event to hide its details.', ({ given, when, then }) => {
    let AppWrapper;
    given('the event details are shown', async () => {
      AppWrapper = await mount(<App />);
      AppWrapper.update();
      AppWrapper.find('.event .show-about').at(0).simulate('click');
    });

    when('the user clicks on hide button', () => {
      AppWrapper.update();
      AppWrapper.find('.event .hide-about').at(0).simulate('click');
    });

    then('the event details should be hidden', () => {
      expect(AppWrapper.find('.event .about')).toHaveLength(0);
    });
  });

});