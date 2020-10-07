import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../../themes/movieTheme';
import { withStyles } from '@material-ui/core';
class MovieListItem extends Component {
  clickhandler = () => {
    // change the page to the Details/movieID url
    this.props.history.push(`/Detail/${this.props.movieItem.id}`);
    // changed this :this.props.history.push('/Detail/${id}') to whats on top to specify the actual id
    // dispatch the selected movie (the one that's clicked on) to your "details" redux state
    this.props.dispatch({
      type: 'FETCH_DETAIL',
      payload: this.props.movieItem,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="movieContainer">
        <img
          src={this.props.movieItem.poster}
          onClick={() => {
            this.props.handleMovieItemClicked(this.props.movieItem);
          }}
          className={classes.moviePoster}
        ></img>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  reduxState,
  // movieItem: reduxState.movieItem,
});

export default withStyles(styles)(connect(mapStateToProps)(MovieListItem));
