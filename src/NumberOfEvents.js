import React, { Component } from "react";
import { ErrorWarning } from "./warning";

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
    errorWarning: ''
  }

  handleInputChanged = (event) => {
    const value = event.target.value;
    if (value <1 || value> 32) {
      this.setState({
        numberOfEvents: value,
        errorWarning: 'Please use a number from 1 to 32'
      });
    } else {
    this.setState({ 
      numberOfEvents: value,
      errorWarning: ''
    });
    }
    this.props.updateEvents(undefined, value);
  }

  render() {
    return (
      <div className="numberofevents">
        <label>Numberof Events:</label>
        <input
          type="number"
          className="numberofeventsdata"
          value={this.state.numberOfEvents}
          onChange={this.handleInputChanged}
        />
        <div><ErrorWarning text={this.state.errorWarning} /></div>
      </div>
    );
  }
}

export default NumberOfEvents;