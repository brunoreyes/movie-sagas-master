import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Edit extends Component {
  state = {
    title: '',
    description: '',
    id: this.props.match.params.id,
  };

  // componentDidMount() {
  //   // use component did mount to dispatch an action to request the SearchList from the API
  //   this.props.dispatch({
  //     type: 'SET_MOVIES',
  //     payload: this.props.match.params.id,
  //     //
  //   });
  // }

  saveChangesClicked = (event) => {
    console.log('In Save Changes clicked');
    console.log('this.state', this.state);

    // this.props.dispatch({action}) action is an action.object

    this.props.dispatch({
      type: 'FETCH_EDIT',
      payload: {
        id: this.state.id,
        title: this.state.title,
        description: this.state.description,
      },
      newDetails: {
        poster: this.props.reduxState.details.poster,
        id: this.state.id,
        title: this.state.title,
        description: this.state.description,
        array_agg: this.props.reduxState.details.array_agg,
      },
    });

    // this.props.history.push is going to bring
    // the user into the next part of the feedback form (understanding)
    // which is a route listed within App.js's router

    this.props.history.push(`/Detail/${this.props.match.params.id}`);
  }; // end nextClicked

  cancelClicked = (event) => {
    console.log('In Cancel clicked');

    // this.props.dispatch({
    //   type: 'SET_MOVIES',
    //   payload: this.props.details,
    // });

    // this.props.history.path is going to bring
    // the user into the next part of the feedback form (understanding)
    // which is a route listed within App.js's router
    // this.props.history.push(`/Detail/${this.props.movieItem.id}`);
    this.props.history.push(`/Detail/${this.props.reduxState.details.id}`);
  };

  textInput = (event, propertyName) => {
    console.log('in textInput, value:', event.target.value);

    // this.setState sets the state's comment property = to the user's input
    this.setState({
      ...this.state,
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <img src={this.props.reduxState.details.poster}></img>
        <br></br>
        <TextField
          placeholder="Title"
          // defaultValue={this.props.reduxState.details.title}
          onChange={(event) => this.textInput(event, 'title')}
          label="Title"
          variant="filled"
          id="filled-basic"
        ></TextField>
        <br></br>
        <TextField
          placeholder="Description"
          // defaultValue={this.props.reduxState.details.description}
          onChange={(event) => this.textInput(event, 'description')}
          label="Description"
          variant="filled"
          id="filled-basic"
        ></TextField>
        <br></br>
        <br></br>
        <Button
          variant="contained"
          onClick={(event) => this.cancelClicked(event, 'title')}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={(event) => this.saveChangesClicked(event, 'title')}
        >
          Save Changes
        </Button>
      </div>
    );
  }
}

const putReduxStateOnProps = (reduxState) => ({
  reduxState,
});

export default connect(putReduxStateOnProps)(Edit);
