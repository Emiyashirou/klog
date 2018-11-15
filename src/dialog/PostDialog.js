import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import fetch from 'isomorphic-fetch';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core';

const get_post_url = 'https://8vcheayky1.execute-api.us-east-2.amazonaws.com/dev/post/';

const archive_post_url = 'https://8vcheayky1.execute-api.us-east-2.amazonaws.com/dev/archive-post/';

const styles = theme => ({
  postContent: {
    minWidth: 400
  }
});

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
    scroll: 'body',
    loading: false
  };

  handleClickOpen = scroll => () => {
    this.setState({ open: true, scroll });
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
        <Button onClick={this.handleClickOpen('paper')}>{this.state.buttonText}</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          scroll={this.state.scroll}
          aria-labelledby='scroll-dialog-title'
        >
          <DialogTitle id='scroll-dialog-title'>{this.state.title}</DialogTitle>
          {this.state.loading ? <LinearProgress /> : null}
          <DialogContent>
              <TextField
                className={classes.postContent}
                fullWidth={true}
                variant='standard'
                disabled={true}
                id='post-content'
                multiline
                value={this.state.content}
                margin='normal'
                />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Cancel
            </Button>
            <Button onClick={this.handleArchive} color='primary'>
              Archive
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(PostDialog);