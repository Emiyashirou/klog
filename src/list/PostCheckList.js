import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import PostDialog from './../dialog/PostDialog';

const host_url = 'https://8vcheayky1.execute-api.us-east-2.amazonaws.com/dev/post'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class PostCheckList extends React.Component {

  constructor(props) {
    super();
    this.state.inWork = props.inWork;
    this.state.workId = props.workId;
  }

  state = {
    checked: [],
    postList: []
  };

  componentDidUpdate(prevProps, prevState) {
    if((prevState.checked.length != this.state.checked.length)){
      this.props.handlePostCheckList(this.state.checked);
    }
    
    if(prevProps.workId !== this.props.workId){
      let self = this;
      this.setState({
        inWork: this.props.inWork,
        workId: this.props.workId
      });
      this.getPostList(this.props.inWork, this.props.workId)
      .then(function(postListData){
        self.setState({
          postList: postListData.data
        });
      });
    }
  }

  componentDidMount(){
    let self = this;
    this.getPostList(this.state.inWork, this.state.workId)
    .then(function(postListData){
      self.setState({
        checked: [],
        postList: postListData.data
      });
    });
  }

  getPostList(inWork, workId){
    return fetch(inWork ? host_url + '?workId=' + workId : host_url + '?workId=NA')
      .then(response => response.json());
  }

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    if(newChecked.length <= 1){
      this.setState({
        checked: newChecked,
      });
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List>
          {this.state.postList.map(value => (
            <ListItem key={value.id} role={undefined} dense button onClick={this.handleToggle(value)}>
              <Checkbox
                checked={this.state.checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary={value.title} />
              <div>
                <PostDialog id={value.id} buttonText={'Read'}/>
              </div>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

PostCheckList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostCheckList);