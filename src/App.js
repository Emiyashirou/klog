import React, { Component} from 'react';
import './App.css';
import ResponsiveDrawer from './dashboard/ResponsiveDrawer';
import ComposeDialog from './dialog/ComposeDialog';
import PostDialog from './dialog/PostDialog';
import WorkCard from './feed/WorkCard';
import PostCard from './feed/PostCard';
import LinearIndeterminate from './shared/LinearIndeterminate';
import AddWorkDialog from './dialog/AddWorkDialog';
import PostCheckList from './list/PostCheckList';
import WorkCheckList from './list/WorkCheckList';
import WorkList from './list/WorkList';
import PostList from './list/PostList';

class App extends Component{
  render(){
    return(
      <div className='App'>
        <ResponsiveDrawer />
        {/* <ComposeDialog /> */}
        {/* <LinearIndeterminate /> */}
        {/* <AddWorkDialog /> */}
        {/* <PostCheckList inWork={true} /> */}
        {/* <PostCheckList inWork={false} /> */}
        {/* <WorkCheckList /> */}
      </div>
    );
  }
}

export default App;