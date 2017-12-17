import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardText, CardTitle, FlatButton, TextField} from "material-ui";
import styles from "../../css/expenselist.css";
import {Tooltip, Bar, BarChart, Line, LineChart, XAxis, YAxis} from "recharts";

var ExpenseStoreActions = require('../../actions/ExpenseStoreActions');

class ExpenseGraph extends Component {
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
}

export default ExpenseGraph;
