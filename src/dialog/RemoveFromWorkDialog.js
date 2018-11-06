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

class RemoveFromWorkDialog extends React.Component {

  constructor(props) {
    super();
    this.state.workId = props.workId;
    this.state.workName = props.workName;
  }

  state = {
    open: false,
  };

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
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Remove From Work"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.state.workName}
            </DialogContentText>
          </DialogContent>
          <PostCheckList workId={this.state.workId} inWork={true}/>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus disabled={this.state.workId === 'NA'}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default RemoveFromWorkDialog;