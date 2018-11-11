import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import WorkCard from './../feed/WorkCard';

const host_url = 'https://8vcheayky1.execute-api.us-east-2.amazonaws.com/dev/work'

const styles = {
  workContainer: {
    margin: 10
  }
}

class WorkList extends React.Component {

  constructor(props) {
    super();
    this.state.setCurrentWork = props.setCurrentWork;
    this.state.setLoading = props.setLoading;
  }

  state = {
    workList: []
  };

  componentWillMount(){
    this.state.setLoading('workLoading', true);
  }

  componentDidMount(){
    let self = this;
    this.getWorkList()
    .then(function(workListData){
      self.setState({
        workList: workListData.data
      });
      self.state.setLoading('workLoading', false);
    });
  }

  getWorkList(){
    return fetch(host_url)
      .then(response => response.json());
  }

  render(){
    const { classes } = this.props;
    return (
      <div className={classes.workContainer}>
        {this.state.workList.map(value => (
          <WorkCard key={value.id} id={value.id} title={value.title} description={value.description} setCurrentWork={this.state.setCurrentWork}/>
        ))}
      </div>
    );
  }

}

WorkList.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(WorkList);