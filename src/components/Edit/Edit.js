import React, { Component } from 'react';
import { connect } from 'react-redux';

class Edit extends Component {
  componentDidMount() {
    // use component did mount to dispatch an action to request the SearchList from the API
    this.props.dispatch({
      type: 'FETCH_EDIT',
      payload: this.props.match.params.id,
      //
    });
  }
  render() {
    return (
      <div>
        {this.props.reduxState.details.map((movieDetails, arraySpot) => (
          <img key={arraySpot}> src={movieDetails.poster}></img>
        ))}
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
