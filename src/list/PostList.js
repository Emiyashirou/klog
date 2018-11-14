import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import PostCard from './../feed/PostCard';

const host_url = 'https://8vcheayky1.execute-api.us-east-2.amazonaws.com/dev/post'

const styles = {
  postContainer: {
    margin: 10
  }
}

class PostList extends React.Component {

  constructor(props) {
    super();
    this.state.workId = props.workId;
    this.state.workName = props.workName;
    this.state.setLoading = props.setLoading;
  }

  state = {
    postList: []
  }

  componentDidUpdate(prevProps) {
    if(prevProps.workId !== this.props.workId){
      let self = this;
      this.setState({
        workId: this.props.workId,
        workName: this.props.workName
      });
      this.getPostList(this.props.workId)
      .then(function(postListData){
        self.setState({
          postList: postListData.data
        });
      });
    }
  }

  componentWillMount(){
    this.state.setLoading('postLoading', true);
  }

  componentDidMount(){
    let self = this;
    this.getPostList(this.state.workId)
    .then(function(postListData){
      self.setState({
        postList: postListData.data
      });
      self.state.setLoading('postLoading', false);
    });
  }

  getPostList(wordId){
    return fetch(host_url + '?workId=' + wordId)
      .then(response => response.json());
  }

  cutContent(content){
    if(content == null){
      return '';
    }
    if(content.length === 0){
      return '';
    }
    return content.substring(0, 100) + '...';
  }

  render(){
    const { classes } = this.props;
    return (
      <div className={classes.postContainer}>
        {this.state.postList.map(value => (
          <PostCard key={value.id} id={value.id} title={value.title} content={this.cutContent(value.content)} work={this.state.workName}/>
        ))}
      </div>
    );
  }

}

PostList.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PostList);

