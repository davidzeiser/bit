import React from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import BitcoinApp from './BitcoinApp';


const App = () => (
  <MuiThemeProvider>    
    <BitcoinApp />
  </MuiThemeProvider>
);

export default App;
