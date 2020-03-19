import React from 'react';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
import {
  BrowserRouter as Router, Switch, Redirect, Route, useParams,
} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import {
  Typography, Card, CardContent, CardMedia,
} from '@material-ui/core';
import moment from 'moment';
import trainee from './data/trainee';

const TraineeDetails = () => {
  const { traineeId } = useParams();
  const data = trainee.filter((item) => item.id === traineeId);
  const { name, email, createdAt } = data[0];
  return (
    <Card>
      <CardMedia
        image="images/banners/cloud.jpg"
        title="Live from space album cover"
      />
      <CardContent>
        <Typography variant="h6">
          {name}
        </Typography>
        <br />
        <Typography variant="h8">
          {moment(createdAt).format('dddd MMMM Do YY h:mm:ss a')}
        </Typography>
        <br />
        <br />
        <Typography gutterBottom variant="h7">
          {email}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TraineeDetails;
