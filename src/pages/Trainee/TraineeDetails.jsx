import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

const TraineeDetails = (props) => {
  const { data } = props;
  console.log(data);
  return (
    <Card>
      <CardContent>
        <Typography variant="h1" component="h2">
          {data}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TraineeDetails;
