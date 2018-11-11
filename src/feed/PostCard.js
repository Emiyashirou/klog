import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PostDialog from './../dialog/PostDialog';
import ComposeDialog from './../dialog/ComposeDialog';

const styles = {
  card: {
    minWidth: 275,
    margin: 10
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

class PostCard extends React.Component {

  constructor(props) {
    super();
    this.state.id = props.id;
    this.state.title = props.title;
    this.state.content = props.content;
    this.state.work = props.work;
  }

  state = {};

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color='textSecondary' gutterBottom>
            {this.state.work}
            </Typography>
          <Typography variant='h5' component='h2'>
            {this.state.title}
            </Typography>
          <Typography className={classes.pos} color='textSecondary'>
            Novel
            </Typography>
          <Typography component='p'>
            {this.state.content}
          </Typography>
        </CardContent>
        <CardActions>
          <PostDialog id={this.state.id} buttonText={'Read'}/>
          <ComposeDialog id={this.state.id} isNew={false} buttonText={'Edit'}/>
        </CardActions>
      </Card>
    );
  }

}

PostCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostCard);