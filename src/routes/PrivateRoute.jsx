import { Route, Redirect } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import { PrivateLayout } from '../Layout';

const PrivateLayoutRoute = ({ component: Component, ...rest }) => (
  <>
    {
      (!localStorage.getItem('token'))
        ? <Redirect to="/login" />
        : ''
    }
    <Route
      {...rest}
      render={(matchProps) => (
        <PrivateLayout>
          <Component {...matchProps} />
        </PrivateLayout>
      )}
    />
  </>
);

PrivateLayoutRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PrivateLayoutRoute;
