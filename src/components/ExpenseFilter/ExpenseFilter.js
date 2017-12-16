import React, { Component } from 'react';
import {TextField} from "material-ui";
import styles from "../../css/expenselist.css";

var ExpenseStoreActions = require('../../actions/ExpenseStoreActions');

class ExpenseFilter extends Component {
    render() {
        return (
            <div>
                <TextField
                    hintText="Enter filter query"
                    floatingLabelText="Filter expenses"
                    fullWidth={true}
                    onChange={this.handleFilter.bind(this)}
                />
            </div>
        )
    }

    handleFilter(event, newValue){
        ExpenseStoreActions.filterExpenses(newValue);
    }
}

export default ExpenseFilter;
