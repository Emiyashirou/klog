import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

const host_url = 'https://8vcheayky1.execute-api.us-east-2.amazonaws.com/dev/work/';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class WorkCheckList extends React.Component {
  state = {
    checked: [],
    workList: []
  };

  componentDidUpdate(prevProps, prevState) {
    if((prevState.checked.length !== this.state.checked.length)){
      this.props.handleWorkCheckList(this.state.checked);
    }
  }

  componentDidMount(){
    let self = this;
    this.getWorkList()
    .then(function(workListData){
      self.setState({
        checked: [],
        workList: workListData.data
      });
    });
  }

  getWorkList(){
    return fetch(host_url)
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
          {this.state.workList.map(value => (
            <ListItem key={value.id} role={undefined} dense button onClick={this.handleToggle(value)}>
              <Checkbox
                checked={this.state.checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary={value.title} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

WorkCheckList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WorkCheckList);