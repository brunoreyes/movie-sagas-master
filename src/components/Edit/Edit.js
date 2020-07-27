import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Edit extends Component {
  state = {
    name: '',
    description: '',
  };

  componentDidMount() {
    // use component did mount to dispatch an action to request the SearchList from the API
    this.props.dispatch({
      type: 'SET_MOVIES',
      payload: this.props.match.params.id,
      //
    });
  }
  saveChangesClicked = (event) => {
    console.log('In Save Changes clicked');

    this.props.dispatch({
      type: 'SET_MOVIES',
      payload: this.state,
    });

    // this.props.history.path is going to bring
    // the user into the next part of the feedback form (understanding)
    // which is a route listed within App.js's router
    this.props.history.push(`/Detail/${this.props.movieItem.id}`);
  }; // end nextClicked

  cancelClicked = (event) => {
    console.log('In Cancel clicked');

    this.props.dispatch({
      type: 'SET_MOVIES',
      payload: this.state,
    });

    // this.props.history.path is going to bring
    // the user into the next part of the feedback form (understanding)
    // which is a route listed within App.js's router
    this.props.history.push(`/Detail/${this.props.movieItem.id}`);
  }; // end nextClicked

  textInput = (event) => {
    console.log('in textInput, value:', event.target.value);

    // this.setState sets the state's comment property = to the user's input
    this.setState({
      name: event.target.value,
      description: event.target.value,
    });
  }; //end radio

  render() {
    return (
      <div>
        <img src={this.props.reduxState.details.poster}></img>
        <br></br>
        <TextField
          // placeholder="Title"
          defaultValue={this.props.reduxState.details.title}
          onChange={this.textInput}
          label="Title"
          variant="filled"
          id="filled-basic"
        ></TextField>
        <br></br>

        <TextField
          // placeholder="Description"
          defaultValue={this.props.reduxState.details.description}
          onChange={this.textInput}
          label="Description"
          variant="filled"
          id="filled-basic"
        ></TextField>
        <br></br>
        <br></br>

        <Button variant="contained" onClick={this.cancelClicked}>
          Cancel
        </Button>
        <Button variant="contained" onClick={this.saveChangesClicked}>
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
