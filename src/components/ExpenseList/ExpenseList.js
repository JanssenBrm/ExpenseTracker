import React, { Component } from 'react';
import ExpenseListItem from "../ExpenseListItem/ExpenseListItem";
import {Subheader, List, AutoComplete} from "material-ui";
import ExpenseFilter from "../ExpenseFilter/ExpenseFilter";
import styles from "../../css/expenselist.css";

class ExpenseList extends Component {
    render() {
        let expenses = this.props.data.map(expense => {
            return (
                <ExpenseListItem expense={ expense }>
                    { expense.description}
                </ExpenseListItem>
            )
        });
        return (
            <div className={styles.expenseList}>
                <ExpenseFilter data={this.props.data} />
                <List>
                { expenses }
                </List>
            </div>

        )
    }
}

export default ExpenseList;
