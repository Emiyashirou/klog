import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddPostIcon from '@material-ui/icons/AddCircleOutline';
import AddWorkIcon from '@material-ui/icons/AddBox';
import AddIntoWorkIcon from '@material-ui/icons/HowToVote';
import RemoveFromWorkIcon from '@material-ui/icons/Unarchive';
import InfoIcon from '@material-ui/icons/Info'


export const mainItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <AddPostIcon />
      </ListItemIcon>
      <ListItemText primary="Add Post" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AddWorkIcon />
      </ListItemIcon>
      <ListItemText primary="Add Work" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AddIntoWorkIcon />
      </ListItemIcon>
      <ListItemText primary="Add Into Work" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <RemoveFromWorkIcon />
      </ListItemIcon>
      <ListItemText primary="Remove From Work" />
    </ListItem>
  </div>
);

export const otherItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <InfoIcon />
      </ListItemIcon>
      <ListItemText primary="Info" />
    </ListItem>
  </div>
);