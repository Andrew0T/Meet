import React, { Component } from "react";
import { ErrorAlert } from "./alert";

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
    errorAlert: " "
  }

  handleInputChanged = (event) => { 
    const value = event.target.value;
    this.setState({numberOfEvents: value});
    if (value <1) {
      this.setState({
        numberOfEvents: 1,
        errorAlert: "Please enter a number from 1 to 32",
      })
    }
    else if (value> 32) {
      this.setState({
        numberOfEvents: 32,
        errorAlert: "Please enter a number from 1 to 32",
      });
    } else {
      this.setState({ 
        numberOfEvents: value,
        errorAlert: " ",
      });
    }
    this.props.updateEvents(undefined, value);
  }

  render() {
    const { errorAlert, numberOfEvents} = this.state;
    return (
      <div className="numberofevents">
        <ErrorAlert text={errorAlert} />
        <label>Number of Events: </label>
        <input
          type="number"
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