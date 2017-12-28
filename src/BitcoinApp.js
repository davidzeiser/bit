import React from 'react';
import MainDrawer from './MainDrawer';
import BitcoinAppBar from './BitcoinAppBar';
import BitcoinChart from './BitcoinChart';

export default class BitcoinApp extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			update: true,
			ticks: [],
			currency: "USD"
		};
	}
	
	componentDidMount() {           
		const request = new XMLHttpRequest();
		request.open('GET', 'https://blockchain.info/ticker', true);    
		request.onload = function(e) {
			if (request.status >= 200 && request.status < 400) {
				const data = JSON.parse(request.responseText);
				const temp = this.state.ticks;
				temp.push({timestamp: Date.now(), data: data});
				console.log(temp);     
				this.setState({
					ticks: temp
				})
				this.timerID = setInterval(
					() => this.tick(),
					10000
				);            
			} else {
				console.error(request.statusText)
			}      
		}.bind(this);    
		request.onerror = () =>    
		console.error(request.statusText)   
		request.send();    
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}
	
	tick() {
		if(!this.state.update)
			return;
		const request = new XMLHttpRequest();
		request.open('GET', 'https://blockchain.info/ticker', true);    
		request.onload = function(e) {
			if (request.status >= 200 && request.status < 400) {
				const data = JSON.parse(request.responseText);
				const temp = this.state.ticks;
				temp.push({timestamp: Date.now(), data: data});
				console.log(temp);     
				this.setState({
					ticks: temp
				})                        
			} else {
				console.error(request.statusText)
			}      
		}.bind(this);    
		request.onerror = () =>    
		console.error(request.statusText)   
		request.send();
	}
	
	handleToggle = () => this.setState({open: !this.state.open});
	handleClose = () => this.setState({open: false});
	handleUpdateToggle = () => this.setState({update: !this.state.update});    
	handleCurrencyChange = (value) => this.setState({currency: value}); 
	
	render() {
		const loading = this.state.ticks.length > 0 ? false : true;
		return(
			<div>
			<MainDrawer 
			showDrawer={this.state.open} 
			onCloseClick={this.handleClose} 
			onUpdateToggle={this.handleUpdateToggle} 
			currentTick={loading ? null : this.state.ticks[this.state.ticks.length - 1]}
			onCurrencyChange={this.handleCurrencyChange}
			currency={this.state.currency}
			/>
			<BitcoinAppBar onMenuClick={this.handleToggle} title={loading ? 'last price' : `last price: ${this.state.ticks[this.state.ticks.length - 1].data[this.state.currency].symbol}${this.state.ticks[this.state.ticks.length - 1].data[this.state.currency].last}`}/>
			
			{loading ? <br/> : <BitcoinChart ticks={this.state.ticks} currency={this.state.currency}/>}
			</div>
		);
	}
}

