import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  // , Slide, Typography
} from '@material-ui/core';
import MovieListItem from '../MovieListItem/MovieListItem';

class MovieList extends Component {
  componentDidMount() {
    // use component did mount to dispatch an action to request the SearchList from the API
    this.props.dispatch({ type: 'FETCH_MOVIES' });
  }
  render() {
    return (
      <div>
        {/* <pre>{JSON.stringify(this.props.reduxState.movies)}</pre> */}

        <Grid direction="row" justify="flex-start" alignItems="flex-start">
          {/* mapping each item within the array and them calling them searchItem */}

          {/* we use the conditional render to see if results are displayed, if they aren't before
          the server is up we send a please wait message */}
        {this.props.reduxState.movies === [] ? 'please wait..' :

          this.props.reduxState.movies.map((movieItem, index) => (
            <MovieListItem
              key={index}
              history={this.props.history}
              //   We need to pass history down to movie list item
              movieItem={movieItem}
            />
          ))
        }

        </Grid>
        {/* <pre>{JSON.stringify(this.props.reduxState.searchName)}</pre> */}
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  reduxState,
});

export default connect(mapStateToProps)(MovieList);
