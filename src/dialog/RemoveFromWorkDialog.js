import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import RemoveFromWorkIcon from '@material-ui/icons/Unarchive';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PostCheckList from './../list/PostCheckList';
import LinearProgress from '@material-ui/core/LinearProgress';

const host_url = 'https://8vcheayky1.execute-api.us-east-2.amazonaws.com/dev/remove-from-work';

class RemoveFromWorkDialog extends React.Component {

  constructor(props) {
    super();
    this.state.workId = props.workId;
    this.state.workName = props.workName;
  }

  state = {
    open: false,
    postCheckList: [],
    loading: false
  };

  handlePostCheckList = (checked) => {
    this.setState({
      postCheckList: checked
    });
  }

  componentDidUpdate(prevProps) {
    if(prevProps.workId !== this.props.workId){
      let self = this;
      this.setState({
        workName: this.props.workName,
        workId: this.props.workId
      });
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleReload = () => {
    window.location.reload();
  }

  handleSubmit = () => {
    if(this.state.postCheckList.length == 1 && this.state.workId != 'NA'){
      let self = this;

      self.setState({
        loading: true
      });

      let removeFromWork = {
        'postId': this.state.postCheckList[0].id,
        'workId': this.state.workId
      };

      return fetch(host_url, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(removeFromWork)
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

  render() {
    return (
      <div>
        <ListItem button onClick={this.handleClickOpen}>
          <ListItemIcon>
            <RemoveFromWorkIcon />
          </ListItemIcon>
          <ListItemText primary='Remove From Work' />
        </ListItem>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>{'Remove From Work'}</DialogTitle>
          {this.state.loading ? <LinearProgress /> : null}
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              {this.state.workName}
            </DialogContentText>
          </DialogContent>
          <PostCheckList handlePostCheckList={this.handlePostCheckList} workId={this.state.workId} inWork={true}/>
          <DialogActions>
            <Button onClick={this.handleClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color='primary' autoFocus disabled={this.state.workId === 'NA' || this.state.postCheckList.length != 1}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default RemoveFromWorkDialog;