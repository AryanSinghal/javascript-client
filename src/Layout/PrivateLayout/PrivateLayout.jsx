import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from '../components';
import { Redirect } from 'react-router-dom';

const PrivateLayout = (props) => {
  const { children } = props;
  if (!localStorage.getItem('token')) {
    return <Redirect to="/login" />
  }
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
