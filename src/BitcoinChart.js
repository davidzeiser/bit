import React from 'react';
import {Card, CardHeader/*, CardActions, CardText*/} from 'material-ui/Card';
/*import FlatButton from 'material-ui/FlatButton';*/
import { LineChart, /*Brush,*/ d3 } from 'react-d3-components';


const tooltipLine = (x,data,z) =>  `$${data.y} @ ${data.x.toLocaleTimeString()}`


export default class BitcoinChart extends React.Component {   
    
    constructor(props) {
        super(props);
        this.state = { width: window.innerWidth, height: window.innerHeight };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
      }
      
      componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
      }
      
      componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
      }
      
      updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
      }

      render(){
    
    const array = [];
    const values = [];    
    let {minY, maxY} = 0;
    minY = 2000000;
    this.props.ticks.map(tick => {
        array.push({x: new Date(tick.timestamp), y: tick.data[this.props.currency].last});
        values.push(parseInt(tick.data[this.props.currency].last,10));
        return tick;                 
    });
    minY = Math.min(...values) - 10;
    maxY = Math.max(...values) + 10;
    const data = {label: '', values: array}   
    const xScale = d3.time.scale().domain([new Date(this.props.ticks[0].timestamp),new Date(this.props.ticks[this.props.ticks.length - 1].timestamp)]).range([0,1000-70]);    
    
    const yScale = d3.scale.linear().domain([maxY,minY]).range([0,400-60])
    

    return (
  <Card>      
    <CardHeader
      title="Recent Price"
      subtitle={this.props.currency}      
    />   
     
    <LineChart
        data={data}
        width={1000}
        height={400}
        margin={{top: 10, bottom: 50, left: 60, right: 10}}
        xScale={xScale}
        yScale={yScale}
        tooltipHtml={tooltipLine}
        xAxis={{tickValues: xScale.ticks(4), tickFormat: d3.time.format("%X")}}
        yAxis={{tickValues: yScale.ticks(8)}}        
    />    
    <br/>       
    </Card>    
    );
}
}