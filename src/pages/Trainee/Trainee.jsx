import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import TraineeList from './TraineeList';
import TraineeDetails from './TraineeDetails';

const Trainee = (props) => {
  const { match: { path } } = props;
  return (
    <>
      <Router>
        <Switch>
          <Route exact path={`${path}`} component={TraineeList} />
          <Route exact path={`${path}/:traineeId`} component={TraineeDetails} />
        </Switch>
      </Router>
    </>
  );
};

Trainee.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
};

export default Trainee;
