import React, { Component} from 'react';
import './App.css';
import ResponsiveDrawer from './dashboard/ResponsiveDrawer';
import LinearIndeterminate from './shared/LinearIndeterminate';

class App extends Component{
  render(){
    return(
      <div className='App'>
        <ResponsiveDrawer />
        {/* <LinearIndeterminate /> */}
      </div>
    );
  }
}

export default App;