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

const host_url = 'https://8vcheayky1.execute-api.us-east-2.amazonaws.com/dev/work';

export default class AddWorkDialog extends React.Component {
  state = {
    open: false,
    title: '',
    description: ''
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = () => {
    let self = this;
    let newWork = {
      'title': this.state.title,
	    'priority': 0,
	    'description': this.state.description
    };

    return fetch(host_url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newWork)
      })
      .then(function(response){
        self.handleClose();
        return response;
      });
  }

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
              value={this.state.title}
              onChange={this.handleChange('title')}
              fullWidth
            />
            <TextField
              margin='dense'
              id='desc'
              label='Description'
              type='text'
              value={this.state.description}
              onChange={this.handleChange('description')}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color='primary'>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}