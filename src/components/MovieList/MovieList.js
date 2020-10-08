import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  GridList,
  GridListTile,
  withStyles,
  Typography,
  IconButton,
} from '@material-ui/core';
import MovieListItem from '../MovieListItem/MovieListItem';
import styles from '../../themes/movieTheme';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Fade from 'react-reveal/Fade';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import CancelIcon from '@material-ui/icons/Cancel';
// import { Roll, Zoom, Rotate, Flip } from 'react-reveal';

class MovieList extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_MOVIES' });
  }
  state = {
    title: '007 Collection',
    poster: 'images/jamesBondPoster.png',
    description:
      'The James Bond series produced by Eon Productions, starring Sean Connery as the fictional MI6 agent James Bond. It is based on the novel of the same name by Ian Fleming. The film also stars Honor Blackman as Bond girl Pussy Galore and Gert Fröbe as the title character Auric Goldfinger, along with Shirley Eaton as the iconic Bond girl Jill Masterson. Goldfinger was produced by Albert R. Broccoli and Harry Saltzman and was the first of four Bond films directed by Guy Hamilton.',
    cover: 'images/jamesBondCover.jpg',
    trailer: 'https://www.youtube.com/watch?v=F208Zc4pXbk',
    director: 'Sam Mendes',
    duration: '2h 43m',
    rating: 'R',
    genres: ['Adventure', 'Drama', 'Action'],
    trailerMode: false,
    show: false,
  };
  handleMovieItemClicked = (movieItem) => {
    this.setState({
      id: movieItem.id,
      title: movieItem.title,
      poster: movieItem.poster,
      description: movieItem.description,
      cover: movieItem.cover,
      trailer: movieItem.trailer,
      director: movieItem.director,
      duration: movieItem.duration,
      rating: movieItem.rating,
      genres: movieItem.genres,
    });
    // console.log('handleMovieItemClicked was clicked! movieItem:', movieItem);
  };
  toggleTrailerMode = () => {
    this.setState({
      trailerMode: !this.state.trailerMode,
      show: !this.state.show,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.screenBackground}>
        <div className={classes.hero}>
          <div className={classes.infoSection}>
            <header className={classes.leftMovieInfoContainer}>
              <Fade top cascade>
                <p className={classes.miviLogo}>MIVI</p>
              </Fade>
              <Fade key={this.state.id}>
                <Typography className={classes.title}>
                  {this.state.title}{' '}
                  {this.state.trailerMode ? (
                    <IconButton
                      aria-label="close movie trailer"
                      onClick={this.toggleTrailerMode}
                      title="close movie trailer"
                    >
                      <CancelIcon className={classes.iconButton} title="Demo" />
                    </IconButton>
                  ) : (
                    <IconButton
                      aria-label="play movie trailer"
                      onClick={this.toggleTrailerMode}
                      title="play movie trailer"
                    >
                      <PlayCircleFilledIcon className={classes.iconButton} />
                    </IconButton>
                  )}
                </Typography>
                <Typography className={classes.description}>
                  {/* {textTruncate(movie.description, 450)} */}{' '}
                  {this.state.description}
                </Typography>
                <div
                  className={
                    this.state.trailerMode
                      ? classes.directedTimeGenresClose
                      : classes.directedTimeGenres
                  }
                >
                  {' '}
                  <Typography className={classes.director}>
                    Directed By {this.state.director}
                  </Typography>
                  <Typography className={classes.duration}>
                    <AccessTimeIcon className={classes.durationIcon} />
                    {this.state.duration}
                  </Typography>{' '}
                  {/*  In postgreSQL I used json_agg to receive an array of
                  genres: [], and then I mapped them out, not an object: {} */}
                  {this.state.genres === []
                    ? 'please wait..'
                    : this.state.genres.map((genre, index) => (
                        <Typography className={classes.genre} key={index}>
                          {genre}
                        </Typography>
                      ))}{' '}
                  <Fade left opposite when={this.state.show}>
                    <div className={classes.trailerContainer} allowfullscreen>
                      <iframe
                        title={`${this.state.title} movie trailer`}
                        frameborder="0"
                        // diable={true}
                        // style="display:none;"
                        className={classes.trailer}
                        // I emptied out the source in case anyone was to hover over the hidden video
                        src={
                          this.state.trailerMode
                            ? this.state.trailer.replace('watch?v=', 'embed/')
                            : ''
                        }
                      ></iframe>
                    </div>{' '}
                  </Fade>
                </div>
              </Fade>
            </header>{' '}
          </div>{' '}
          <Fade key={this.state.id}>
            <div
              className={classes.blurredCover}
              style={{
                backgroundImage: `url(${this.state.cover})`,
              }}
            />{' '}
          </Fade>
          <Fade key={this.state.id} when={this.state.show === false}>
            <div className={classes.rightMovieInfoContainer}>
              <Typography className={classes.rating}>
                {this.state.rating}
              </Typography>{' '}
            </div>
          </Fade>
        </div>
        <GridList className={classes.gridList} cols={6.3} cellHeight={'100%'}>
          {this.props.reduxState.movies === []
            ? 'please wait..'
            : this.props.reduxState.movies.map((movieItem, index) => (
                <GridListTile onClick={this.handleFade}>
                  <Fade>
                    <MovieListItem
                      key={index}
                      history={this.props.history}
                      movieItem={movieItem}
                      handleMovieItemClicked={this.handleMovieItemClicked}
                    />{' '}
                  </Fade>
                </GridListTile>
              ))}
        </GridList>
        {/* <pre>{JSON.stringify(this.props.reduxState.searchName)}</pre> */}
      </div>
    );
  }
}
const mapStateToProps = (reduxState) => ({
  reduxState,
});
export default withStyles(styles)(connect(mapStateToProps)(MovieList));
