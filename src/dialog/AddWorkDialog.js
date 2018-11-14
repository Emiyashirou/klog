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
import LinearProgress from '@material-ui/core/LinearProgress';

const get_work_url = 'https://8vcheayky1.execute-api.us-east-2.amazonaws.com/dev/work';

const archive_work_url = 'https://8vcheayky1.execute-api.us-east-2.amazonaws.com/dev/archive-work/';

export default class AddWorkDialog extends React.Component {

  constructor(props) {
    super();
    this.state.id = props.id;
    this.state.isNew = props.isNew;
  }

  componentDidMount(){
    if(!this.state.isNew){
      let self = this;
      this.getWork()
      .then(function(workData){
        self.setState({
          title: workData.data.title,
          description: workData.data.description
        });
      });
    }
  }

  getWork(){
    return fetch(get_work_url + '/' + this.state.id)
      .then(response => response.json());
  }

  state = {
    open: false,
    title: '',
    description: '',
    loading: false
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

    self.setState({
      loading: true
    });

    if(this.state.isNew){
      return fetch(get_work_url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newWork)
        })
        .then(function(response){
          self.setState({
            loading: false
          });
          self.handleClose();
          self.handleReload();
          return response;
        });
    } else {
      return fetch(get_work_url + '/' + this.state.id, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newWork)
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

  handleArchive = () => {
    let self = this;

    self.setState({
      loading: true
    });

    return fetch(archive_work_url + this.state.id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
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

  handleReload = () => {
    window.location.reload();
  }

  render() {
    return (
      <div>
        {
          this.state.isNew ?
          <ListItem button onClick={this.handleClickOpen}>
            <ListItemIcon>
              <AddWorkIcon />
            </ListItemIcon>
            <ListItemText primary='Add Work' />
          </ListItem> : <Button onClick={this.handleClickOpen}>Edit</Button>
        }
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby='form-dialog-title'
        >
          {
            this.state.isNew ?
            <DialogTitle id='form-dialog-title'>New Work</DialogTitle> :
            <DialogTitle id='form-dialog-title'>Edit Work</DialogTitle>
          }
          {this.state.loading ? <LinearProgress /> : null}
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
            <Button onClick={this.handleClose} color='secondary'>
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color='primary'>
              Submit
            </Button>
            <Button onClick={this.handleArchive} disabled={this.state.id === 'NA'}>
              Archive
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}