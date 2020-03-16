import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {
  Button,
  TextField,
  InputAdornment,
  Grid,
  Typography,
  Avatar,
} from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import LockIcon from '@material-ui/icons/Lock';
import { LOGIN_SCHEMA } from '../../configs/constants';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
      hasError: true,
    };
  }

  hasErrors = () => {
    const {
      name, email, password, confirmPassword, nameError,
      emailError, passwordError, confirmPasswordError,
    } = this.state;
    return (!(name && email && password && confirmPassword)
      || (nameError || emailError || passwordError || confirmPasswordError));
  }

  getError = async (label) => {
    const key = `${[label]}Error`;
    try {
      await LOGIN_SCHEMA.validateAt(label, { [label]: this.state[label] });
      return { [key]: '' };
    } catch (error) {
      return { [key]: error.errors };
    }
  }

  isDisabled = () => {
    const { hasError } = this.state;
    return !!(hasError);
  }

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

  render() {
    const { emailError, passwordError } = this.state;
    return (
      <Grid style={{ height: '100vh' }} container alignItems="center" justify="center">
        <Card style={{ width: '400px' }}>
          <CardContent>
            <div align="center">
              <Avatar style={{ backgroundColor: 'red' }}>
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
            <Button fullWidth align="center">Sign In</Button>
          </CardActions>
        </Card>
      </Grid>
    );
  }
}

export default Login;
