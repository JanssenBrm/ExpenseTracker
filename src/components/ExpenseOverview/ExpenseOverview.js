import React, { Component } from 'react';
import ExpenseList from "../ExpenseList/ExpenseList";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import constants from "../../css/constants.css";
import styles from "../../css/expenselist.css";
import {AppBar} from "material-ui";
import ExpenseDashboard from "../ExpenseDashboard/ExpenseDashboard";

var ExpenseStoreActions = require('../../actions/ExpenseStoreActions');
var ExpenseStore = require('../../stores/ExpenseStore');

// Method to retrieve application state from store
function getAppState() {
    return {
        expenses: ExpenseStore.getExpenses()
    };
}


class ExpenseOverview extends Component {
    constructor(props) {
        super(props);
        this.state = getAppState();
        this._onChange = this._onChange.bind(this);
    }

    componentDidMount() {
        ExpenseStore.addChangeListener(this._onChange);
        ExpenseStoreActions.getExpenses();
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <div class="row">
                        <AppBar className={styles.navBar}
                            title={<span style={styles.title}>Expense Tracker</span>}
                        />
                    </div>
                    <div class="row no-gutters">
                        <div class="col-md-3"><ExpenseList data={ this.state.expenses }/></div>
                        <div class="col-md-9"><ExpenseDashboard data={ this.state.expenses } /></div>
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }

    _onChange() {
        console.log('EXPENSE OVERVIEW - State has changed');
        this.setState(getAppState());
        console.log('EXPENSE OVERVIEW - New state', this.state.expenses);
    }
}

export default ExpenseOverview;