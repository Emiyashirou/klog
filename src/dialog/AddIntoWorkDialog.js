import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIntoWorkIcon from '@material-ui/icons/HowToVote';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PostCheckList from './../list/PostCheckList';
import WorkCheckList from './../list/WorkCheckList';

class AddIntoWorkDialog extends React.Component {
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
            <AddIntoWorkIcon />
          </ListItemIcon>
          <ListItemText primary='Add Into Work' />
        </ListItem>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Add Into Work"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Post List
            </DialogContentText>
          </DialogContent>
          <PostCheckList inWork={false} />
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Work List
            </DialogContentText>
          </DialogContent>
          <WorkCheckList />
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AddIntoWorkDialog;