import React, { Component } from 'react';
import { connect } from 'react-redux';

class MovieListItem extends Component {
  clickhandler = () => {
    this.props.dispatch({
      type: 'DETAIL_MOVIE',
      payload: this.props.reduxState.details, // we get rid of payload because we aren't returning anything bc
      // of the else if statement written in the checkout reducer in index.js
    });
    // this.props.history.push('/Detail/${id}');
  };

  render() {
    return (
      <div>
        <pre>{JSON.stringify(`this is details:`)}</pre>
        <pre>{JSON.stringify(this.props.reduxState.details)}</pre>

        <img
          src={this.props.movieItem.poster}
          onClick={this.clickhandler}
        ></img>
        <p>{this.props.movieItem.title}</p>
        <p>{this.props.movieItem.description}</p>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  reduxState,
});

export default connect(mapStateToProps)(MovieListItem);
