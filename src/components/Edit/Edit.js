import React, { Component } from 'react';
import { connect } from 'react-redux';

class Edit extends Component {
  render() {
    return (
      <div>
        <input placeholder="Name"></input>
        <input placeholder="Description"></input>
        <button>Cancel</button>
        <button>Save Changes</button>
      </div>
    );
  }
}

const putReduxStateOnProps = (reduxState) => ({
  reduxState,
});

export default connect(putReduxStateOnProps)(Edit);
