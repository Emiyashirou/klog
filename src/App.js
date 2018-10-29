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

class App extends Component{
  render(){
    return(
      <div className='App'>
        <ResponsiveDrawer />
        {/* <ComposeDialog /> */}
        {/* <PostDialog id={"fef4f579-8cfe-4ebd-a391-874f9be061f0"} buttonText={"Post of masterpiece"}/> */}
        {/* <WorkCard id={"workId1"} description={"This is a novel"} title="Masterpiece1"/> */}
        {/* <WorkCard id={"workId2"} description={"This is another novel"} title="Masterpiece2"/> */}
        {/* <PostCard id={"fef4f579-8cfe-4ebd-a391-874f9be061f0"} title={"Post of masterpiece"} content={"This is the first line."} work={"A masterpiece"}/> */}
        {/* <PostCard id={"fef4f579-8cfe-4ebd-a391-874f9be061f0"} title={"Post of masterpiece"} content={"This is the first line."} work={"A masterpiece"}/> */}
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