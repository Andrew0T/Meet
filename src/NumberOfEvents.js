import React, { Component } from "react";
import { ErrorAlert } from "./alert";

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
    errorAlert: ''
  }

  handleInputChanged = (event) => {
    const value = event.target.value;
    if (value <1 || value> 32) {
      this.setState({
        numberOfEvents: value,
        errorAlert: 'Please use a number from 1 to 32'
      });
    } else {
    this.setState({ 
      numberOfEvents: value,
      errorAlert: ''
    });
    }
    this.props.updateEvents(undefined, value);
  }

  render() {
    return (
      <div className="numberofevents">
        <ErrorAlert text={this.state.errorAlert} />
        <label>Numberof Events:</label>
        <input
          type="number"
          className="numberofeventsdata"
          value={this.state.numberOfEvents}
          onChange={this.handleInputChanged}
        />
      </div>
    );
  }
}

export default NumberOfEvents;