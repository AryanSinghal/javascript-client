import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {
  Button,
  TextField,
  InputAdornment,
  Grid,
  Typography,
  withStyles,
  Avatar,
} from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import LockIcon from '@material-ui/icons/Lock';
import { LOGIN_SCHEMA, LOGIN_URL } from '../../configs/constants';
import callApi from '../../lib/utils/api';

const styles = () => ({
  grid: { height: '90vh' },
  card: { width: '400px' },
  avatar: { backgroundColor: 'red' },
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
    };
  }

  hasErrors = () => {
    const {
      email, password, emailError, passwordError,
    } = this.state;
    return (!(email && password) || (emailError || passwordError));
  }

  getError = async (label) => {
    const key = `${[label]}Error`;
    const { [label]: value } = this.state;
    try {
      await LOGIN_SCHEMA.validateAt(label, { [label]: value });
      return { [key]: '' };
    } catch (error) {
      return { [key]: error.errors };
    }
  }

  isDisabled = () => !!this.hasErrors()

  handleEmailChange = (event) => {
    const { value } = event.target;
    this.getError('email', value)
      .then((state) => this.setState({ ...state, email: value }))
      .catch((stateError) => (
        this.setState({ ...stateError, email: value })
      ));
  }

  handlePasswordChange = (event) => {
    const { value } = event.target;
    this.getError('password', value)
      .then((state) => this.setState({ ...state, password: value }))
      .catch((stateError) => (
        this.setState({ ...stateError, password: value })
      ));
  }

  handleSubmit = () => {
    const { email, password } = this.state;
    const token = callApi('post', LOGIN_URL, { email, password });
    console.log(token);
  }

  render() {
    const { emailError, passwordError } = this.state;
    const { classes } = this.props;
    return (
      <Grid className={classes.grid} container alignItems="center" justify="center">
        <Card className={classes.card}>
          <CardContent>
            <div align="center">
              <Avatar className={classes.avatar}>
                <LockIcon />
              </Avatar>
            </div>
            <br />
            <Typography align="center" gutterBottom variant="h5">
              Login
            </Typography>
            <br />
            <br />
            <TextField
              fullWidth
              required
              helperText={emailError}
              error={!!(emailError)}
              id="email"
              label="Email Address"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              onChange={this.handleEmailChange}
              onBlur={this.handleEmailChange}
            />
            <br />
            <br />
            <br />
            <TextField
              fullWidth
              helperText={passwordError}
              error={!!(passwordError)}
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VisibilityOffIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              onChange={this.handlePasswordChange}
              onBlur={this.handlePasswordChange}
            />
          </CardContent>
          <CardActions>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="medium"
              align="center"
              onClick={this.handleSubmit}
              disabled={this.isDisabled()}
            >
              Sign In
            </Button>
          </CardActions>
        </Card>
      </Grid >
    );
  }
}

Login.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles)(Login);
