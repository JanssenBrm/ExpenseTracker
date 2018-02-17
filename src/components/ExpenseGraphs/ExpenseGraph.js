import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardText, CardTitle, FlatButton, TextField} from "material-ui";
import styles from "../../css/expenselist.css";
import {Tooltip, Bar, BarChart, Line, LineChart, XAxis, YAxis, PieChart, Pie, Legend} from "recharts";

var ExpenseStoreActions = require('../../actions/ExpenseStoreActions');

class ExpenseGraph extends Component {



    constructor(props){
        super(props);
        this.colorIndex = 0;
        this.COLORS = ['red', 'green', 'blue', 'organge', 'purple', 'pink'];
    }

    render() {
        console.log("Graph data: ", this.props.data);
        var graph = "";

        if(this.props.type == "line"){
            graph = (
                <LineChart width={400} height={400} data={this.props.data}>
                    <Line dataKey={this.props.graphOptions.value.name}  fill={this.props.graphOptions.value.color}/>
                    <XAxis dataKey="key"/>
                    <YAxis/>
                    <Tooltip/>
                </LineChart>
            );
        }
        if(this.props.type == "doublebar"){
            graph = (
                <BarChart width={400} height={400} data={this.props.data}>
                    <Bar dataKey={this.props.graphOptions.value1.name} fill={this.props.graphOptions.value1.color} />
                    <Bar dataKey={this.props.graphOptions.value2.name} fill={this.props.graphOptions.value2.color} />
                    <XAxis dataKey="key"/>
                    <YAxis/>
                    <Tooltip/>
                </BarChart>
            );
        }

        if(this.props.type == "pie"){
            console.log("PIE CHART" , this.props);
            const data = this.props.data.map(dataEntry => {
                dataEntry.fill = this.getNextColor();
                return dataEntry;
            })
            graph = (
                <PieChart width={400} height={400}>
                    <Pie data={data} nameKey="key" dataKey={this.props.graphOptions.value.name} innerRadius={80} outerRadius={160} fill={this.props.graphOptions.value.color}/>
                    <Tooltip/>
                    <Legend verticalAlign="top" height={36}/>
                </PieChart>
            );
        }

        return (
            <div className={styles.graph}>
                <Card>
                    <CardTitle title={this.props.graphOptions.title} subtitle={this.props.graphOptions.subtitle}/>
                    <CardMedia>
                        { graph }
                    </CardMedia>
                </Card>
            </div>
        )
    }


    getNextColor(){
        const color =  this.COLORS[this.colorIndex % (this.COLORS.length - 1)];
        this.colorIndex++;
        return color;
    }
}

export default ExpenseGraph;
