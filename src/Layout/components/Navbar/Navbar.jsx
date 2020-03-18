import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';

export default function ButtonAppBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6">
              Trainee Portal
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Button href="/trainee" color="inherit" variant="text">TRAINEE</Button>
            <Button href="/textfield-demo" color="inherit" variant="text">TEXTFIELD DEMO</Button>
            <Button href="/input-demo" color="inherit" variant="text">INPUT DEMO</Button>
            <Button href="/children-demo" color="inherit" variant="text">CHILDREN DEMO</Button>
            <Button color="inherit" variant="text">LOGOUT</Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
