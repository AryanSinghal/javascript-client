import { Route } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import { PrivateLayout } from '../Layout';

const PrivateLayoutRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(matchProps) => (
      <PrivateLayout>
        <Component {...matchProps} />
      </PrivateLayout>
    )}
  />
);

PrivateLayoutRoute.propTypes = {
};

export default PrivateLayoutRoute;
