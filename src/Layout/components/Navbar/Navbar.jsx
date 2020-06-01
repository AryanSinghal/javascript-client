import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

class ButtonAppBar extends Component {

  handleLogout = () => {
    localStorage.removeItem('token');
    this.setState({ state: this.state });
  }

  render() {
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
              <Button onClick={this.handleLogout} color="inherit" variant="text">LOGOUT</Button>
              {
                (!localStorage.getItem('token'))
                  ? <Redirect to="/login" />
                  : ''
              }
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default ButtonAppBar;
