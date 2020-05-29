import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

const SnackBarContext = React.createContext();

export class SnackbarProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      status: '',
      message: '',
    };
  }

  openSnackbar = (status, message) => {
    this.setState({ open: false, status, message });
  }

  closeSnackbar = () => {
    this.setState({ open: false, status: '', message: '' });
  }

  render() {
    const { open, message, status } = this.state;
    const { children } = this.props;
    return (
      <>
        <SnackBarContext.Provider
          value={{
            openSnackbar: this.openSnackbar
          }}
        >
          {children}
          <Snackbar open={open} autoHideDuration={6000} onClose={this.closeSnackbar}>
            <Alert onClose={this.closeSnackbar} severity={status}>
              {message}
            </Alert>
          </Snackbar>
        </SnackBarContext.Provider>
      </>
    );
  }
}
