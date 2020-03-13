import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {
  Button,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
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

  hasErrors = async () => {
    const {
      email, password,
    } = this.state;
    try {
      const valid = await LOGIN_SCHEMA.isValid({
        email, password,
      });
      return await (!valid);
    } catch (err) {
      console.log(err);
      return true;
    }
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

  setError = (label) => {
    this.getError(label)
      .then((state) => this.setState(state))
      .catch((stateError) => this.setState(stateError));
    this.hasErrors().then((hasError) => this.setState({ hasError }));
  }

  isDisabled = () => {
    const { hasError } = this.state;
    return !!(hasError);
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value }, () => {
      this.setError('email');
    });
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value }, () => {
      this.setError('password');
    });
  }

  render() {
    const { emailError, passwordError } = this.state;
    return (
      <Card>
        <CardContent>
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
    );
  }
}

export default Login;
