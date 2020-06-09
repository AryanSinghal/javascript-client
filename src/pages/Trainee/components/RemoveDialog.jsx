import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { SnackbarConsumer } from '../../../contexts';
import { SUCCESS_MESSAGE, FAILURE_MESSAGE } from '../../../configs/constants';

export const RemoveDialog = (props) => {
<<<<<<< HEAD
  const {
    open, onSubmit, onClose, progressBar,
  } = props;
=======
  const { open, onSubmit, onClose, data } = props;
>>>>>>> e17e7dfe67902287e1933b25e0653953a2165429
  return (
    <>
      <Dialog
        fullWidth
        open={open}
        onClose={onClose}
      >
        <DialogTitle>Remove Trainee</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you really want to remove trainee?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <SnackbarConsumer>
            {({ openSnackbar }) => (
              <Button
                onClick={() => {
                  onSubmit(data);
                  if (new Date(data.createdAt) >= new Date('2019-02-14T00:00:00'))
                    openSnackbar('success', SUCCESS_MESSAGE);
                  else
                    openSnackbar('error', FAILURE_MESSAGE);
                }}
                color="primary"
                autoFocus
              >
                Delete
              </Button>
            )}
          </SnackbarConsumer>
        </DialogActions>
      </Dialog>
    </>
  );
};

RemoveDialog.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
<<<<<<< HEAD
  progressBar: PropTypes.bool.isRequired,
=======
  data: PropTypes.object.isRequired,
>>>>>>> e17e7dfe67902287e1933b25e0653953a2165429
};
