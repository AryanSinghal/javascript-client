import React from 'react';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
import {
  BrowserRouter as Router, Switch, Redirect, Route, useParams,
} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import {
  Typography, Card, CardContent, CardMedia, Grid,
} from '@material-ui/core';
import moment from 'moment';
import trainee from './data/trainee';

const TraineeDetails = () => {
  const { traineeId } = useParams();
  const data = trainee.filter((item) => item.id === traineeId);
  const { name, email, createdAt } = data[0];
  return (
    <Card>
      <Grid container spacing={2}>
        <Grid xs={2}>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image="/images/banners/cloud.jpg"
            title="Contemplative Reptile"
          />
        </Grid>
        <Grid xs={10}>
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
        </Grid>
      </Grid>
    </Card>
  );
};

export default TraineeDetails;
