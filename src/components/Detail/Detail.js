import React, { Component } from 'react';
import { connect } from 'react-redux';
import Edit from '../Edit/Edit';

class Detail extends Component {
  componentDidMount() {
    // use component did mount to dispatch an action to request the SearchList from the API
    this.props.dispatch({
      type: 'FETCH_DETAIL',
      payload: this.props.match.params.id,
      //
    });
  }
  //   handleEdit = () => {
  //     // TODO: Clear the cart and navigate to the product page

  //     this.props.dispatch({
  //       type: 'DETAIL_MOVIE',
  //       // payload: this.props.product,
  //       // we get rid of payload because we aren't returning anything bc
  //       // of the else if statement written in the checkout reducer in index.js
  //     });
  //   };

  // // this if statement basically makes sure that if the user didn't select an input
  // // they are not allowed to go to the next page and alerted that they must submit info
  // if (this.state.feeling !== ``) {
  //     // this.props.dispatch uses dispatch to push form data
  //     //  back to index.js's state array using Redux
  //     this.props.dispatch({
  //       type: 'SET_FEEDBACK',
  //       payload: this.state,
  //     });

  //     // this.props.history.path is going to bring
  //     // the user into the next part of the feedback form (understanding)
  //     // which is a route listed within App.js's router
  //     this.props.history.push('/understanding');
  //   } else {
  //     alert('To be able to continue please select a number between 1-5.');
  //   }
  // }; // end nextClicked

  render() {
    return (
      <div>
        {/* {this.props.reduxState.details.title !== '' ? 'error' : 'okay'} */}
        {this.props.reduxState.details.title !== undefined ? (
          'error'
        ) : (
          // 'okay'
          <div>
            <img src={this.props.reduxState.details.poster} />
            <p>{this.props.reduxState.details.title}</p>
            <p>{this.props.reduxState.details.description}</p>
          </div>
        )}

        <pre>{JSON.stringify(this.props.match.params.id)}</pre>
        <pre>{JSON.stringify(this.props.details)}</pre>
        <img src={this.props.reduxState.details.poster} />
        <p>{this.props.reduxState.details.title}</p>
        <p>{this.props.reduxState.details.description}</p>

        {/* <button onClick={this.handleEdit}>Edit Information</button> */}
        {/* </span> */}
      </div>
    );
  }
}

const putReduxStateOnProps = (reduxState) => ({
  reduxState,
});

export default connect(putReduxStateOnProps)(Detail);
