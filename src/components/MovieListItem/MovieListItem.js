import React, { Component } from 'react';
import { connect } from 'react-redux';

class MovieListItem extends Component {
  clickhandler = () => {
    this.props.history.push(`/Detail/${this.props.movieItem.id}`);
    // changed this :this.props.history.push('/Detail/${id}') to whats on top to specify the actual id
  };

  render() {
    return (
      <div>
        <pre>{JSON.stringify(`this is the details section:`)}</pre>
        <pre>{JSON.stringify(this.props.reduxState.details)}</pre>

        <img
          src={this.props.movieItem.poster}
          onClick={this.clickhandler}
        ></img>
        <p>{this.props.movieItem.title}</p>
        <p>{this.props.movieItem.description}</p>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  reduxState,
});

export default connect(mapStateToProps)(MovieListItem);
