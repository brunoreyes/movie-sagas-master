import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Paper,
  // Paper, Slide, Typography
} from '@material-ui/core';
class MovieListItem extends Component {
  clickhandler = () => {
    this.props.history.push(`/Detail/${this.props.movieItem.id}`);
    // changed this :this.props.history.push('/Detail/${id}') to whats on top to specify the actual id
  };

  render() {
    return (
      <div className="movieContainer">
        {/* <pre>{JSON.stringify(`this is the details section:`)}</pre> */}
        {/* <pre>{JSON.stringify(this.props.reduxState.details)}</pre> */}
        <Paper elevation={3}>
          <img
            src={this.props.movieItem.poster}
            onClick={this.clickhandler}
          ></img>
          <h4>{this.props.movieItem.title}</h4>
          <p>{this.props.movieItem.description}</p>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  reduxState,
});

export default connect(mapStateToProps)(MovieListItem);
