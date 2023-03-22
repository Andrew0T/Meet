import React, { Component } from 'react';

class Warning extends Component {
  constructor(props) {
    super(props);
    this.color = null;
  }

  getStyle = () => {
    return {
      color: this.color,
    };
  };

  render() {
    return (
      <div className="Warning">
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

class InfoWarning extends Warning {
  constructor(props) {
    super(props);
    this.color = 'blue';
  }
}

class OfflineWarning extends Warning {
  constructor(props) {
    super(props);
    this.color = 'orange';
  }
}

class ErrorWarning extends Warning {
  constructor(props) {
    super(props);
    this.color = 'red';
  }
}

export { InfoWarning, OfflineWarning, ErrorWarning };
