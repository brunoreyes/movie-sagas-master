import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  withStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import styles from '../themes/selectorTheme';
// import VisibilityIcon from '@material-ui/icons/Visibility';
// import Fade from 'react-reveal/Fade';
const CategorySelectorHeight = 40;
const CategorySelectorPaddingTop = 6;
const CategorySelectorProps = {
  PaperProps: {
    style: {
      maxHeight: CategorySelectorHeight * 3.4 + CategorySelectorPaddingTop,
      width: 150,
    },
  },
};

class GenreSelector extends Component {
  state = {
    title: '',
    type: '',
    description: '',
    imageLink: '',
    videoLink: '',
    questions: {},
    textContent: '',
    qmap: [],
    preview: false,
  };

  handleQuestionChange = (propertyName) => (event) => {
    // console.log('old state:', this.state);
    this.setState({
      ...this.state,
      questions: {
        ...this.state.questions,
        [propertyName]: event.target.value,
      },
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.formControlContainer}>
        <div className={classes.formControlLeft}>
          View
          {/* <VisibilityIcon /> */}
        </div>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel className={classes.categorySelector} label="View All">
            All
          </InputLabel>
          <Select
            label="Gender *"
            MenuProps={CategorySelectorProps}
            //   value={this.state.gender || ''}
            //   onChange={this.handleInputChangeFor('gender')}
            inputProps={{
              classes: {
                icon: classes.icon,
                outlined: classes.outlined,
              },
            }}
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
              },
            }}
          >
            <MenuItem value=""></MenuItem>
            <MenuItem value="Male">Horror</MenuItem>
            <MenuItem value="Female">Fantasy</MenuItem>
            <MenuItem value="Other">Romance</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }
}

GenreSelector.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default withStyles(styles)(connect(mapReduxStateToProps)(GenreSelector));
