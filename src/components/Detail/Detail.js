import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Edit from '../Edit/Edit';

class Detail extends Component {
  handleEdit = () => {
    // TODO: Clear the cart and navigate to the product page

    this.props.dispatch({
      type: 'DETAIL_MOVIE',
      // payload: this.props.product,
      // we get rid of payload because we aren't returning anything bc
      // of the else if statement written in the checkout reducer in index.js
    });
  };

    render() {
        return (
            <div>
                {this.props.reduxState.details((movieItem, index) => (
                    <span key={index}>
                        <img src={movieItem.poster} />
                        <p>{movieItem.title}</p>
                        <p>{movieItem.description}</p>
                        {/* <button onClick={this.handleEdit}>Edit Information</button> */}
                    </span>
                ))}
            </div> 
        );
    }
  }

const putReduxStateOnProps = (reduxState) => ({
  reduxState,
});

export default connect(putReduxStateOnProps)(Detail);
