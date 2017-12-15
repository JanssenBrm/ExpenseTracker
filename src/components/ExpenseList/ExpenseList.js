import React, { Component } from 'react';
import ExpenseListItem from "../ExpenseListItem/ExpenseListItem";
import {Subheader, List} from "material-ui";

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

            <List>
                <Subheader>Selectable Contacts</Subheader>
            { expenses }
            </List>

        )
    }
}

export default ExpenseList;
