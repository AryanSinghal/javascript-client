import React from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
} from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Grid from '@material-ui/core/Grid';
import { DIALOG_SCHEMA } from '../../../../configs/constants';

export class AddDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      nameError: '',
      emailError: '',
      passwordError: '',
      confirmPasswordError: '',
      hasError: true,
    };
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value }, () => {
      this.getError('name')
        .then((state) => this.setState(state))
        .catch((stateError) => this.setState(stateError));
    });
    this.hasErrors().then((hasError) => this.setState({ hasError }));
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value }, () => {
      this.getError('email')
        .then((state) => this.setState(state))
        .catch((stateError) => this.setState(stateError));
    });
    this.hasErrors().then((hasError) => this.setState({ hasError }));
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value }, () => {
      this.getError('password')
        .then((state) => this.setState(state))
        .catch((stateError) => this.setState(stateError));
    });
    this.hasErrors().then((hasError) => this.setState({ hasError }));
  }

  handleConfirmPasswordChange = (event) => {
    this.setState({ confirmPassword: event.target.value }, () => {
      this.getError('confirmPassword')
        .then((state) => this.setState(state))
        .catch((stateError) => this.setState(stateError));
    });
    this.hasErrors().then((hasError) => this.setState({ hasError }));
  }

  hasErrors = async () => {
    const {
      name, email, password, confirmPassword,
    } = this.state;
    try {
      const valid = await DIALOG_SCHEMA.isValid({
        name, email, password, confirmPassword,
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
      await DIALOG_SCHEMA.validateAt(label, { [label]: this.state[label] });
      return { [key]: '' };
    } catch (error) {
      return { [key]: error.errors };
    }
  }

  isDisabled = () => {
    const { hasError } = this.state;
    return !!(hasError);
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    const { name, email, password } = this.state;
    console.log({ name, email, password });
  };

  render() {
    const {
      open, nameError, emailError, passwordError, confirmPasswordError,
    } = this.state;
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          ADD TRAINEE
        </Button>
        <Dialog fullWidth open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">ADD TRAINEE</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter Your Trainee Details
            </DialogContentText>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="name"
                  label="Name"
                  helperText={nameError}
                  error={!!(nameError)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  onChange={this.handleNameChange}
                  onBlur={this.handleNameChange}
                />
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={6}>
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
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  helperText={confirmPasswordError}
                  error={!!(confirmPasswordError)}
                  id="confirm-password"
                  label="Confirm Password"
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
                  onChange={this.handleConfirmPasswordChange}
                  onBlur={this.handleConfirmPasswordChange}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              CANCEL
            </Button>
            <Button onClick={this.handleClose} color="primary" disabled={this.isDisabled()}>
              SUBMIT
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
