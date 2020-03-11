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
import * as yup from 'yup';

export class AddDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: '',
      email: '',
      password: '',
      nameError: '',
      emailError: '',
      passwordError: '',
      confirmPasswordError: '',
      isTouch: false,
    };
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value }, () => { this.getError('name'); });
    this.isTouched();
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value }, () => { this.getError('email'); });
    this.isTouched();
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value }, () => {
      this.getError('password');
      this.getError('confirmPassword');
    });
    this.isTouched();
  }

  hasErrors = () => {
    const {
      nameError, emailError, passwordError,
    } = this.state;
    return !!((nameError || emailError || passwordError));
  }

  isTouched = () => {
    const {
      name, email, password,
    } = this.state;
    this.setState({ isTouch: true });
    return !!(name || email || password);
  }

  getError = (label) => {
    const schema = yup.object().shape({
      name: yup.string().required('Name is required field'),
      email: yup.string().email().required('Email is required field'),
      password: yup.string().required('Password is required field'),
      // .matches('^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$',
      //   'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'),
      confirmPassword: yup.string().required('Confirm Password is required field').oneOf([yup.ref('password'), null], 'Passwords must match'),
    });
    const key = `${[label]}Error`;
    schema.validateAt(label, { [label]: this.state[label] })
      .then(() => {
        this.setState({ [key]: '' });
      })
      .catch((error) => {
        this.setState({ [key]: error.errors });
        return key;
      });
  }

  isDisabled = () => {
    const { isTouch } = this.state;
    return (this.hasErrors() && isTouch) ? 'disabled' : '';
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    console.log(this.state);
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
                  onChange={this.handlePasswordChange}
                  onBlur={this.handlePasswordChange}
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
