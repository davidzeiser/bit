import React from 'react';
import AppBar from 'material-ui/AppBar';
/*import IconButton from 'material-ui/IconButton'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'*/


const BitcoinAppBar = (props) => (
  <AppBar
    title={props.title}
    titleStyle={{textAlign: 'center'}}    
    onLeftIconButtonTouchTap={props.onMenuClick}    
  />
);


export default BitcoinAppBar;