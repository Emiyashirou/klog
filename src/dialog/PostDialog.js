import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import fetch from 'isomorphic-fetch';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

const get_post_url = 'https://8vcheayky1.execute-api.us-east-2.amazonaws.com/dev/post/';

const archive_post_url = 'https://8vcheayky1.execute-api.us-east-2.amazonaws.com/dev/archive-post/';

const styles = theme => ({
  appBar: {
    position: 'relative'
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

class PostDialog extends React.Component {

  constructor(props) {
    super();
    this.state.id = props.id;
    this.state.buttonText = props.buttonText;
  }

  componentDidMount(){
    let self = this;
    this.getPost()
    .then(function(postData){
      self.setState({
        title: postData.data.title,
        content: postData.data.content
      });
    });
  }

  getPost(){
    return fetch(get_post_url + this.state.id)
      .then(response => response.json());
  }

  state = {
    open: false,
    title: '',
    content: '',
    loading: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleReload = () => {
    window.location.reload();
  }

  handleArchive = () => {
    let self = this;

    self.setState({
      loading: true
    });

    return fetch(archive_post_url + this.state.id, {
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

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Read</Button>
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
                {this.state.title}
              </Typography>
              <Button color='inherit' onClick={this.handleArchive}>
                Archive
              </Button>
            </Toolbar>
          </AppBar>
          {this.state.loading ? <LinearProgress /> : null}
          <TextField
            id='post-dialog-content'
            multiline
            value={this.state.content}
            className={classes.textField}
            margin='normal'
            InputProps={{
              disableUnderline: true
            }}
          />
        </Dialog>
      </div>
    );
  }
}

PostDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostDialog);