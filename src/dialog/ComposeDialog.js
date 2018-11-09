import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AddPostIcon from '@material-ui/icons/AddCircleOutline';

const host_url = 'https://8vcheayky1.execute-api.us-east-2.amazonaws.com/dev/post';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  }
});

function Transition(props) {
  return <Slide direction='up' {...props} />;
}

class ComposeDialog extends React.Component {
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

  handleSave = () => {
    let self = this;
    let newPost = {
      'title': this.state.title,
      'priority': 0,
      'content': this.state.content 
    }

    return fetch(host_url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost)
      })
      .then(function(response){
        self.handleClose();
        return response;
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <ListItem button onClick={this.handleClickOpen}>
          <ListItemIcon>
            <AddPostIcon />
          </ListItemIcon>
          <ListItemText primary='Add Post' />
        </ListItem>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color='inherit' onClick={this.handleClose} aria-label='Close'>
                <CloseIcon />
              </IconButton>
              <Typography variant='h6' color='inherit' className={classes.flex}>
                Compose New Post
              </Typography>
              <Button color='inherit' onClick={this.handleSave}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          <TextField
            id='ocompose-dialog-title'
            label='Title'
            value={this.state.title}
            className={classes.textField}
            margin='normal'
            variant='outlined'
            onChange={this.handleChange('title')}
          />
          <TextField
            id='compose-dialog-content'
            label='Start your masterpiece here...'
            multiline
            rows='20'
            value={this.state.content}
            className={classes.textField}
            margin='normal'
            variant='outlined'
            onChange={this.handleChange('content')}
          />
        </Dialog>
      </div>
    );
  }
}

ComposeDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ComposeDialog);