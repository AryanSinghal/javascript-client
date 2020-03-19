import React from 'react';
import {
  BrowserRouter as Router, Switch, Redirect, Route,
} from 'react-router-dom';
import TraineeList from './TraineeList';
import trainee from './data/trainee';
import TraineeDetails from './TraineeDetails';

export const Trainee = () => (
  <>
    <Router>
      <Switch>
        <Route exact path="/trainee" component={TraineeList} />
        {
          trainee.map((value) => <Route exact path={`/trainee/${value.id}`} component={TraineeDetails} />)
        }
      </Switch>
    </Router>
  </>
);
