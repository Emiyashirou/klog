import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddWorkIcon from '@material-ui/icons/AddBox';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

export default class AddWorkDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <ListItem button onClick={this.handleClickOpen}>
          <ListItemIcon>
            <AddWorkIcon />
          </ListItemIcon>
          <ListItemText primary='Add Work' />
        </ListItem>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>New Work</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Work is a collection of post for easy organization.
            </DialogContentText>
            <TextField
              autoFocus
              margin='dense'
              id='title'
              label='Title'
              type='text'
              fullWidth
            />
            <TextField
              margin='dense'
              id='desc'
              label='Description'
              type='text'
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={this.handleClose} color='primary'>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}