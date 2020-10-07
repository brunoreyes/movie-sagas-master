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
    // So we used json_agg to turn what we got back from SQL, and then we mapped out from there, since it was an array: []
    // and not an object
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
                <Typography
                  className={classes.movieTitle}
                  variant="h1"
                  color="inherit"
                >
                  {this.state.title}
                </Typography>

                <Typography className={classes.description}>
                  {/* {textTruncate(movie.description, 450)} */}{' '}
                  {this.state.description}
                </Typography>
                <div className={classes.directedTimeGenres}>
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
                  {/* <div className={classes.sectionVideoContainer}>
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
                  </div>{' '} */}
                  <IconButton
                    aria-label="demo"
                    // className={classes.iconLight}
                  >
                    <PlayCircleFilledIcon
                      className={classes.iconLight}
                      title="Demo"
                    />
                  </IconButton>{' '}
                  <div
                    style={this.state.messageMode ? {} : { display: 'none' }}
                  >
                    <div className={classes.form}>
                      <form
                        onSubmit={this.sendEmail}
                        className="gform "
                        method="POST"
                        data-email="bruno619reyes@gmail.com"
                        action="https://script.google.com/macros/s/AKfycbxtcbHlRFTg6H0rcFU2dNnHZNdyabfR3uKLE7Tv06TyA71Cy6Y/exec"
                      >
                        {' '}
                        <span
                          className={
                            this.state.darkMode
                              ? classes.formTitleLight
                              : classes.formTitle
                          }
                        >
                          Let's Chat
                        </span>{' '}
                        <Button
                          onClick={this.handleClose}
                          className={
                            this.state.darkMode
                              ? classes.formButtonExitLight
                              : classes.formButtonExit
                          }
                          title="Exit Messenger"
                        >
                          X
                        </Button>
                        <div className="form-elements" id="form-elements">
                          <TextField
                            autoFocus
                            margin="dense"
                            label={
                              <span
                                className={
                                  this.state.darkMode
                                    ? classes.formLabelsLight
                                    : classes.formLabels
                                }
                              >
                                Email Address
                              </span>
                            }
                            name="email"
                            id="email"
                            type="email"
                            fullWidth
                            variant="outlined"
                            InputProps={
                              this.state.darkMode
                                ? {
                                    classes: {
                                      input: classes.inputLight,

                                      notchedOutline:
                                        classes.notchedOutlineLight,
                                    },
                                  }
                                : {
                                    classes: {
                                      input: classes.input,
                                      notchedOutline: classes.notchedOutline,
                                    },
                                  }
                            }
                          />
                          <TextField
                            autoFocus
                            margin="dense"
                            label={
                              <span
                                className={
                                  this.state.darkMode
                                    ? classes.formLabelsLight
                                    : classes.formLabels
                                }
                              >
                                Name
                              </span>
                            }
                            id="name"
                            name="name"
                            type="text"
                            fullWidth
                            variant="outlined"
                            InputProps={
                              this.state.darkMode
                                ? {
                                    classes: {
                                      input: classes.inputLight,
                                      notchedOutline:
                                        classes.notchedOutlineLight,
                                    },
                                  }
                                : {
                                    classes: {
                                      input: classes.input,
                                      notchedOutline: classes.notchedOutline,
                                    },
                                  }
                            }
                          />
                          <TextField
                            autoFocus
                            variant="outlined"
                            margin="dense"
                            label={
                              <span
                                className={
                                  this.state.darkMode
                                    ? classes.formLabelsLight
                                    : classes.formLabels
                                }
                              >
                                Message
                              </span>
                            }
                            name="message"
                            id="message"
                            type="text"
                            fullWidth
                            multiline
                            rows={4}
                            InputProps={
                              this.state.darkMode
                                ? {
                                    classes: {
                                      input: classes.inputLight,
                                      notchedOutline:
                                        classes.notchedOutlineLight,
                                    },
                                  }
                                : {
                                    classes: {
                                      input: classes.input,
                                      notchedOutline: classes.notchedOutline,
                                    },
                                  }
                            }
                          />
                          <input
                            id="honeypot"
                            type="text"
                            name="honeypot"
                            className="honeypot-field"
                            hidden
                          />
                        </div>
                        <div className={classes.formButtonContainer}>
                          <Button
                            onClick={this.handleClose}
                            className={
                              this.state.darkMode
                                ? classes.formButtonLight
                                : classes.formButton
                            }
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={() => {
                              this.handleClose();
                              this.handleSend();
                            }}
                            className={
                              this.state.darkMode
                                ? classes.formButtonRightLight
                                : classes.formButtonRight
                            }
                            type="submit"
                            value="Send"
                          >
                            Send
                          </Button>
                        </div>
                      </form>
                      <script
                        data-cfasync="false"
                        type="text/javascript"
                        src="formSubmissionHandler.js"
                      ></script>
                    </div>
                  </div>
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
          <Fade key={this.state.id}>
            <div className={classes.movieActions}>
              {' '}
              {/* <GenreSelector className={classes.genreSelector} /> */}
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
                      //   We need to pass history down to movie list item
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
