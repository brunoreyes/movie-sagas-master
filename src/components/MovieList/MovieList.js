import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  GridList,
  GridListTile,
  withStyles,
  // , Slide,
  Typography,
  // Link,
  Button,
  FormControl,
  IconButton,
  TextField,
} from '@material-ui/core';
import MovieListItem from '../MovieListItem/MovieListItem';
import styles from '../../themes/movieTheme';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Fade from 'react-reveal/Fade';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import CancelIcon from '@material-ui/icons/Cancel';
// import GenreSelector from '../GenreSelector';

class MovieList extends Component {
  componentDidMount() {
    // use component did mount to dispatch an action to request the SearchList from the API
    this.props.dispatch({ type: 'FETCH_MOVIES' });
  }
  state = {
    id: '',
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
    // So we used json_agg to turn what we got back from SQL, and then we mapped out from there, since it was an array: []
    // and not an object: {}
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
    console.log('edit was clicked! Task state:', movieItem);
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
      <div className={classes.background}>
        <div className={classes.movieHero}>
          {' '}
          <div className={classes.infoSection}>
            <header className={classes.coverContentHolder}>
              <br></br>
              <p className={classes.miviLogo}>MIVI</p>
              <Fade key={this.state.id}>
                <Typography className={classes.movieTitle}>
                  {this.state.title}{' '}
                  {this.state.trailerMode ? (
                    <IconButton
                      aria-label="close trailer"
                      onClick={this.toggleTrailerMode}
                      title="close trailer"
                    >
                      <CancelIcon className={classes.iconClose} title="Demo" />
                    </IconButton>
                  ) : (
                    <IconButton
                      aria-label="play trailer"
                      onClick={this.toggleTrailerMode}
                      title="play trailer"
                    >
                      <PlayCircleFilledIcon className={classes.iconPlay} />
                    </IconButton>
                  )}
                </Typography>

                <Typography className={classes.description}>
                  {/* {textTruncate(movie.description, 450)} */}{' '}
                  {this.state.description}
                </Typography>
                <div
                  // className={classes.directedTimeGenres}
                  className={
                    this.state.trailerMode
                      ? classes.directedTimeGenresClose
                      : classes.directedTimeGenres
                  }
                >
                  <Typography className={classes.director}>
                    Directed By {this.state.director}{' '}
                  </Typography>
                  <Typography className={classes.duration}>
                    <AccessTimeIcon className={classes.timeIcon} />

                    <span> </span>
                    {this.state.duration}
                  </Typography>{' '}
                  {this.state.genres === []
                    ? 'please wait..'
                    : this.state.genres.map((genre, index) => (
                        <Typography className={classes.genre} key={index}>
                          {genre}{' '}
                        </Typography>
                      ))}{' '}
                  <Fade left opposite when={this.state.show}>
                    <div className={classes.sectionVideoContainer}>
                      <iframe
                        allowfullscreen="allowfullscreen"
                        webkitallowfullscreen="true"
                        mozallowfullscreen="true"
                        title={'section video'}
                        frameborder="0"
                        className={classes.sectionVideo}
                        src={
                          this.state.trailer
                            .replace('watch?v=', 'embed/')
                            .split('&feature=emb_title')[0]
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
              className={classes.blurBackground}
              style={{
                backgroundImage: `url(${this.state.cover})`,
              }}
            />{' '}
          </Fade>
          <Fade key={this.state.id} opposite when={this.state.show === false}>
            <div className={classes.movieActions}>
              <Typography className={classes.rating}>
                {' '}
                {this.state.rating}
              </Typography>{' '}
            </div>
          </Fade>
        </div>

        <Grid
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          className={classes.grid}
        >
          {/* mapping each item within the array and them calling them searchItem */}
          <GridList
            className={classes.gridList}
            cols={window.screen.width < 600 ? 2 : 6.3}
            cellHeight={'100%'}
          >
            {this.props.reduxState.movies === []
              ? 'please wait..'
              : this.props.reduxState.movies.map((movieItem, index) => (
                  <GridListTile onClick={this.handleFade}>
                    <MovieListItem
                      key={index}
                      history={this.props.history}
                      movieItem={movieItem}
                      handleMovieItemClicked={this.handleMovieItemClicked}
                    />
                  </GridListTile>
                ))}
          </GridList>
        </Grid>
        {/* <pre>{JSON.stringify(this.props.reduxState.searchName)}</pre> */}
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  reduxState,
  movieItem: reduxState.movieItem,
});

export default withStyles(styles)(connect(mapStateToProps)(MovieList));
