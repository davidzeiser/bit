import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton'
import Toggle from 'material-ui/Toggle'
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import DropDownMenu from 'material-ui/DropDownMenu';
import Subheader from 'material-ui/Subheader';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

export default class MainDrawer extends React.Component {

    /*constructor(props) {
        super(props);
        
    }*/

    handleCurrencyChange = (e,i,v) => this.props.onCurrencyChange(v);
    render() {
        const menuItems = [];
        let timestamp = 'never';
        if(this.props.currentTick !== null) {
            Object.keys(this.props.currentTick.data).forEach(key => menuItems.push(<MenuItem value={key} key={key} primaryText={`${key} - ${this.props.currentTick.data[key].symbol}`}/>));
            timestamp = new Date(this.props.currentTick.timestamp).toLocaleTimeString();
        }
        else menuItems.push(<MenuItem disabled={true} value='USD' key={-1} primaryText="Loading.." />);
        return(
        <div>            
            <Drawer open={this.props.showDrawer} zDepth={1}>
                <AppBar                 
                    onLeftIconButtonTouchTap={this.props.onCloseClick}
                    iconElementLeft={<IconButton><NavigationClose /></IconButton>}
                />
                <DropDownMenu 
                value={this.props.currency} 
                onChange={this.handleCurrencyChange} 
                autoWidth={false}
                maxHeight={250}
                >
                    {menuItems}                    
                </DropDownMenu>                 
                <Divider />
                <Toggle 
                label="Auto-Update"
                defaultToggled={true}
                onToggle={this.props.onUpdateToggle}
                style={{padding: '12px 16px'}}
                iconStyle={{margin: 'auto'}}
                labelStyle={{width: '50%'}}
                />
                <Subheader>{`Last update: ${timestamp}`}</Subheader>
            </Drawer>
        </div>
        );
    }
}

