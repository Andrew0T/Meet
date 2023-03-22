import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });

  test("render number of events", () => {
    expect(NumberOfEventsWrapper.find(".numberofevents")).toHaveLength(1);
  });

  test("render the input of number of events", () => {
    expect(NumberOfEventsWrapper.find(".numberofeventsdata")).toHaveLength(1);
  });

  test("render the default number of 32 events", () => {
    expect(NumberOfEventsWrapper.find(".numberofeventsdata").prop('value')).toBe(32);    
  });

});
