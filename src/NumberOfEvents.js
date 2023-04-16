import React, { Component } from "react";
import { ErrorAlert } from "./alert";

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
    errorAlert: " "
  }

  handleInputChanged = (event) => { 
    const value = event.target.value;
      if (value <1 || value> 32) {
        this.setState({
          numberOfEvents: event.target.value,
          errorAlert: "Please enter a number from 1 to 32"
        });
    } else {
      this.setState({ 
        numberOfEvents: event.target.value,
        errorAlert: " "
      });
    }
    this.props.updateEvents(value);
  }

  render() {
    const { errorAlert, numberOfEvents} = this.state;
    return (
      <div className="numberofevents">
        <ErrorAlert text={errorAlert} />
        <label>Number of Events: </label>
        <input
          type="number"
          defaultValue="32"
          min="1"
          max="32"
          className="numberofeventsdata"
          value={numberOfEvents}
          onChange={this.handleInputChanged}
        />
      </div>
    );
  }
}

export default NumberOfEvents;