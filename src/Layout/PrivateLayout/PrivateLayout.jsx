import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from '../components';

const PrivateLayout = (props) => {
  const { children } = props;
  return (
    <>
      <Navbar />
      <br />
      {children}
    </>
  );
};

PrivateLayout.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};

export default PrivateLayout;
