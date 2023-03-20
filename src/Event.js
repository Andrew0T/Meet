import React, { Component } from "react";

class Event extends Component {
  state = {
    aboutVisible: false,
  };

  handleAboutToggled = () => {
    if (!this.state.aboutVisible) {
      this.setState({
        aboutVisible: true,
      });
    } else {
    this.setState({ 
      aboutVisible: false,
    });
  }
};

  render() {
    const { event } = this.props; 
    return(
      <div className="event">
        <h2 className="summary">{event.summary}</h2>
        <p className="location">{event.location}</p>
        <p className="start">{event.start.dateTime}</p>
        {this.state.aboutVisible ? (
          <>
            <div className="about">
                <h3 className="about-title">About event:</h3>
                <a href={event.htmlLink} className="about-link">
                  See details in Google Calendar
                </a>
                <p className="description">{event.description}</p>
              </div>
            <button 
              className="hide-about"
              onClick={this.handleAboutToggled}>
            Hide Event
            </button>          
          </>
            ) : (
          <>
            <button 
              className="show-about"
              onClick={this.handleAboutToggled}>
            Show Event
            </button>
          </>
        )}
      </div>
    );
  }
}

export default Event;
