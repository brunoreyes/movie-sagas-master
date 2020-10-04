import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';
import styles from '../../themes/movieTheme';
import {
  Grid,
  GridList,
  GridListTile,
  withStyles,
  // , Slide, Typography
} from '@material-ui/core';
class MovieListItem extends Component {
  clickhandler = () => {
    // change the page to the Details/movieID url
    this.props.history.push(`/Detail/${this.props.movieItem.id}`);
    // changed this :this.props.history.push('/Detail/${id}') to whats on top to specify the actual id

    // dispatch the selected movie (the one that's clicked on) to your "details" redux state
    this.props.dispatch({
      type: 'FETCH_DETAIL',
      payload: this.props.movieItem,
      //
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="movieContainer">
        {/* <pre>{JSON.stringify(this.props.reduxState.details)}</pre> */}
        {/* <Paper elevation={3}> */}
        <img
          src={this.props.movieItem.poster}
          onClick={this.clickhandler}
          className={classes.movieThumbnail}
        ></img>
        {/* <h4>{this.props.movieItem.title}</h4> */}
        {/* <p>{this.props.movieItem.description}</p> */}
        {/* </Paper> */}
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  reduxState,
});

export default withStyles(styles)(connect(mapStateToProps)(MovieListItem));
