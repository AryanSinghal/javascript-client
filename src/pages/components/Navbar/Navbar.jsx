import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';

export default function ButtonAppBar() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Grid container>
            <Grid item xs={5}>
              <Typography variant="h6">
                Trainee Portal
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <Button color="inherit" variant="h6">TRAINEE</Button>
              <Button color="inherit" variant="h6">TEXTFIELD DEMO</Button>
              <Button color="inherit" variant="h6">INPUT DEMO</Button>
              <Button color="inherit" variant="h6">CHILDREN DEMO</Button>
              <Button color="inherit" variant="h6">LOGOUT</Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
