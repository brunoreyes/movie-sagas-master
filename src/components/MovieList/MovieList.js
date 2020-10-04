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
} from '@material-ui/core';
import MovieListItem from '../MovieListItem/MovieListItem';
import styles from '../../themes/movieTheme';

class MovieList extends Component {
  componentDidMount() {
    // use component did mount to dispatch an action to request the SearchList from the API
    this.props.dispatch({ type: 'FETCH_MOVIES' });
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.background}>
        <div className={classes.movieHero}>
          <div className={classes.infoSection}>
            <header className={classes.movieHeader}>
              {/* {fullDescription && ( */}
              {/* // <Box mb={3} display="flex" alignItems="center" flexWrap="wrap">
                  // {movie.genre.split(',').map((genre, index) => ( */}
              {/* //   <Typography */}
              {/* //     key={`${genre}-${index}`}
                  //     className={classes.tag}
                  //     variant="body1"
                  //     color="inherit"
                  //   >
                  //     {genre}
                  //   </Typography>
                  // ))} */}
              {/* <StyledRating
                    value={4}
                    readOnly
                    size="small"
                    emptyIcon={<StarBorderIcon fontSize="inherit" />}
                  /> */}
              {/* </Box> */}
              {/* // )} */}
              <Typography
                className={classes.movieTitle}
                variant="h1"
                color="inherit"
              >
                {/* {movie.title} */}
                Movie Title
              </Typography>
              <Typography
                className={classes.descriptionText}
                variant="body1"
                color="inherit"
              >
                {/* {textTruncate(movie.description, 450)} */}Harry Potter and
                the Philosopher's Stone (released in the United States, India
                and Pakistan as Harry Potter and the Sorcerer's Stone) is a 2001
                fantasy film directed by Chris Columbus and distributed by
                Warner Bros. Pictures. It is based on J. K. Rowling's 1997 novel
                of the same name. The film is the first instalment of the Harry
                Potter film series and was written by Steve Kloves and produced
                by David Heyman. Its story follows Harry Potter's first year at
                Hogwarts School of Witchcraft and Wizardry as he discovers that
                he is a famous wizard and begins his education. The film stars
                Daniel Radcliffe as Harry Potter, with Rupert Grint as Ron
                Weasley, and Emma Watson as Hermione Granger.
              </Typography>
              <Typography
                className={classes.director}
                variant="h4"
                color="inherit"
              >
                Directed By: Steven Spielberg
              </Typography>
              <Typography
                className={classes.duration}
                variant="body1"
                color="inherit"
              >
                120 min
              </Typography>
              <Typography
                className={classes.genre}
                variant="body1"
                color="inherit"
              >
                {/* {movie.genre} */}
                Horror, Anime, all the good stuff
              </Typography>
            </header>
          </div>
          <div
            className={classes.blurBackground}
            style={{
              // backgroundImage: `url(${movie.image})`,
              backgroundImage: `url(https://miro.medium.com/max/3200/1*FCed9JRqtUCWnr4Idzu_xw.jpeg)`,
            }}
          />
          <div className={classes.movieActions}>
            {/* {fullDescription ? ( */}
            {/* // <Link */}
            {/* // to={`booking/${movie._id}`}
              //   style={{ textDecoration: 'none' }}
              // >
              // <Button variant="contained" className={classes.button}>
              //   Buy Tickets
                {/* <ArrowRightAlt className={classes.buttonIcon} /> */}
            {/* // </Button>
            // ) : (
              // </Link>
              // <Link */}{' '}
            */}
            {/* // to={`movie/${movie._id}`}
              // style={{ textDecoration: 'none' }}
              // >
              // <Button className={classnames(classes.button, classes.learnMore)}>
              // Learn More
              {
                /* <ArrowRightAlt className={classes.buttonIcon} /> */}
            {/* // </Button>
              // </Link>
            // )} */} */}
          </div>
        </div>
        {/* <pre>{JSON.stringify(this.props.reduxState.movies)}</pre> */}

        <Grid direction="row" justify="flex-start" alignItems="flex-start">
          {/* mapping each item within the array and them calling them searchItem */}

          {/* we use the conditional render to see if results are displayed, if they aren't before
          the server is up we send a please wait message */}
          <GridList cols={1}></GridList>
          <GridList cols={window.screen.width < 600 ? 2 : 6} cellHeight={'12%'}>
            {this.props.reduxState.movies === []
              ? 'please wait..'
              : this.props.reduxState.movies.map((movieItem, index) => (
                  <GridListTile>
                    <MovieListItem
                      key={index}
                      history={this.props.history}
                      //   We need to pass history down to movie list item
                      movieItem={movieItem}
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
});

export default withStyles(styles)(connect(mapStateToProps)(MovieList));
