import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 345,
    margin: 10
  },
  media: {
    height: 140,
  },
};

class WorkCard extends React.Component {

  constructor(props) {
    super();
    this.state.id = props.id;
    this.state.title = props.title;
    this.state.description = props.description;
  }

  state = {};

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="/static/images/work/contemplative-reptile.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {this.state.title}
            </Typography>
            <Typography component="p">
              {this.state.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Read
          </Button>
        </CardActions>
      </Card>
    );
  }
  
}

WorkCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WorkCard);