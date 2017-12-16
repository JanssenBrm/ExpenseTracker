import React, { Component } from 'react';
import {TextField} from "material-ui";
import styles from "../../css/expenselist.css";

var ExpenseStoreActions = require('../../actions/ExpenseStoreActions');

class ExpenseGraph extends Component {
    render() {
        return (
            <div className={styles.graph}>
                <h1>Graph</h1>
            </div>
        )
    }
}

export default ExpenseGraph;
