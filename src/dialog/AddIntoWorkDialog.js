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
import LinearProgress from '@material-ui/core/LinearProgress';

const host_url = 'https://8vcheayky1.execute-api.us-east-2.amazonaws.com/dev/add-into-work';

class AddIntoWorkDialog extends React.Component {
  state = {
    open: false,
    postCheckList: [],
    workCheckList: [],
    loading: false
  };

  handlePostCheckList = (checked) => {
    this.setState({
      postCheckList: checked
    });
  }

  handleWorkCheckList = (checked) => {
    this.setState({
      workCheckList: checked
    });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = () => {
    if(this.state.postCheckList.length === 1 && this.state.workCheckList.length === 1){
      let self = this;

      self.setState({
        loading: true
      });

      let addIntoWork = {
        'postId': this.state.postCheckList[0].id,
        'workId': this.state.workCheckList[0].id
      };

      return fetch(host_url, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addIntoWork)
      })
      .then(function(response){
        self.setState({
          loading: false
        });
        self.handleClose();
        self.handleReload();
        return response;
      });
    }
  }

  handleReload = () => {
    window.location.reload();
  }

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
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>{'Add Into Work'}</DialogTitle>
          {this.state.loading ? <LinearProgress /> : null}
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Post List
            </DialogContentText>
          </DialogContent>
          <PostCheckList handlePostCheckList={this.handlePostCheckList} inWork={false} />
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Work List
            </DialogContentText>
          </DialogContent>
          <WorkCheckList handleWorkCheckList={this.handleWorkCheckList} />
          <DialogActions>
            <Button onClick={this.handleClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color='primary' autoFocus 
            disabled={this.state.postCheckList.length !== 1 || this.state.workCheckList.length !== 1}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AddIntoWorkDialog;