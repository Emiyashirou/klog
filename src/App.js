import React, { Component} from 'react';
import './App.css';
import ResponsiveDrawer from './dashboard/ResponsiveDrawer';
import ComposeDialog from './dialog/ComposeDialog';
import PostDialog from './dialog/PostDialog';
import WorkPostList from './list/WorkPostList';
import IdlePostList from './list/IdlePostList';
import WorkCard from './feed/WorkCard';
import LinearIndeterminate from './shared/LinearIndeterminate';

class App extends Component{
  render(){
    return(
      <div className='App'>
        {/* <ResponsiveDrawer /> */}
        {/* <ComposeDialog /> */}
        {/* <PostDialog /> */}
        {/* <WorkPostList /> */}
        {/* <WorkCard /> */}
        {/* <LinearIndeterminate /> */}
        <IdlePostList />
      </div>
    );
  }
}

export default App;