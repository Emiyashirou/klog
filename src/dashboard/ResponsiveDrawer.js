import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import WorkList from './../list/WorkList';
import PostList from './../list/PostList';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IdleIcon from '@material-ui/icons/ClearAll';
import ComposeDialog from '../dialog/ComposeDialog';
import InfoDialog from '../dialog/InfoDialog';
import AddWorkDialog from '../dialog/AddWorkDialog';
import AddIntoWorkDialog from '../dialog/AddIntoWorkDialog';
import RemoveFromWorkDialog from '../dialog/RemoveFromWorkDialog';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  container: {
    display: 'flex',
    flexDirection: 'row'
  },
  leftContainer: {
    maxWidth: 400
  },
  rightContainer: {
    maxWidth: 800
  }
});

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
    workId: 'NA',
    workName: 'Not included in any work'
  };

  setCurrentWork = (workId, workName) => {
    this.setState({
      workId: workId,
      workName: workName
    });
  }

  getIdlePosts = () => {
    this.setState({
      workId: 'NA',
      workName: 'Not included in any work'
    });
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes, theme } = this.props;

    const mainItems = (
      <div>
        <ListItem button onClick={this.getIdlePosts}>
          <ListItemIcon>
            <IdleIcon />
          </ListItemIcon>
          <ListItemText primary='Idle Posts' />
        </ListItem>
        <ComposeDialog />
        <AddWorkDialog />
        <AddIntoWorkDialog />
        <RemoveFromWorkDialog workId={this.state.workId} workName={this.state.workName}/>
      </div>
    );
    
    const otherItems = (
      <div>
        <InfoDialog />
      </div>
    );

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>{mainItems}</List>
        <Divider />
        <List>{otherItems}</List>
        <Divider />
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='Open drawer'
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
            <MenuIcon />
            </IconButton>
            <Typography variant='h6' color='inherit' noWrap>
              Welcome to KLOG
            </Typography>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant='temporary'
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation='css'>
          <Drawer
            variant='permanent'
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div className={classes.container}>
            <div className={classes.leftContainer}>
              <WorkList setCurrentWork={this.setCurrentWork}/>
            </div>
            <div className={classes.rightContainer}>
              <PostList workId={this.state.workId} workName={this.state.workName}/>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);