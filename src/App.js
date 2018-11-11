import React, { Component} from 'react';
import './App.css';
import ResponsiveDrawer from './dashboard/ResponsiveDrawer';

class App extends Component{
  render(){
    return(
      <div className='App'>
        <ResponsiveDrawer />
      </div>
    );
  }
}

export default App;