import React, { Component } from 'react';

const withLoaderAndMessage = (WrappedComponent) => {
  class WithLoaderAndMessage extends Component {
    render() {
      return (
        <>
          <WrappedComponent />
        </>
      );
    }
  }
  return WithLoaderAndMessage;
}

export default withLoaderAndMessage;
