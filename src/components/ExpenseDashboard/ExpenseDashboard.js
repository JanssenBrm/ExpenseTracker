import React, { Component } from 'react';
import {TextField} from "material-ui";
import styles from "../../css/expenselist.css";
import ExpenseGraph from "../ExpenseGraphs/ExpenseGraph";

var ExpenseStoreActions = require('../../actions/ExpenseStoreActions');

class ExpenseDashboard extends Component {
    render() {
        return (
            <div className={styles.dashboard}>
               <h1>Dashboard</h1>
                <ExpenseGraph data="" type="bar" />
            </div>
        )
    }
}

export default ExpenseDashboard;
