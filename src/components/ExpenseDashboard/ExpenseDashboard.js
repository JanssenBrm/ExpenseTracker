import React, { Component } from 'react';
import {Card, CardMedia, CardText, CardTitle, TextField} from "material-ui";
import styles from "../../css/expenselist.css";
import ExpenseGraph from "../ExpenseGraphs/ExpenseGraph";

var ExpenseStoreActions = require('../../actions/ExpenseStoreActions');

class ExpenseDashboard extends Component {

    getMonthlyTotalStats(expenses) {
        var stats = [];

        if (expenses.length > 0) {
            console.log(expenses);

            if (expenses.length == 1) {
                var dateParts = expenses[0].date.split("/");
                var month = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]).toLocaleString("en-US", {month: "long"});
                stats.push({key: month, total: parseFloat(expenses[0].amount)});
            } else {
                stats = expenses
                    .map(expense => {
                        var dateParts = expense.date.split("/");
                        var month = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]).toLocaleString("en-US", {month: "long"});
                        var amount = parseFloat(expense.amount);

                        return {month, amount: amount};
                    })
                    .reduce((months, expense) => {
                        console.log("months", months, "expsense", expense);
                        months[expense.month] = (months[expense.month] || 0) + expense.amount;
                        delete months['month'];
                        delete months['amount'];
                        return months;
                    });
                stats = Object.keys(stats).map(key => {
                    return {key: key, total: stats[key]};
                });
            }


            console.log("Stats: ", stats);
        }
        return stats;

    }

    getMonthlyStats(expenses) {
        var stats = [];

        if (expenses.length > 0) {

            if (expenses.length == 1) {
                var dateParts = expenses[0].date.split("/");
                var month = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]).toLocaleString("en-US", {month: "long"});
                var amount = parseFloat(expenses[0].amount);

                if (amount >= 0) {
                    stats.push({key: month, income: amount, expense: 0});
                } else {
                    stats.push({key: month, income: 0, expense: Math.abs(amount)});
                }
            } else {
                stats = expenses
                    .map(expense => {
                        var dateParts = expense.date.split("/");
                        var month = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]).toLocaleString("en-US", {month: "long"});
                        var amount = parseFloat(expense.amount);

                        return {month, amount: amount};
                    })
                    .reduce((months, expense) => {
                        console.log("months", months, "expsense", expense);
                        months[expense.month] = (months[expense.month] || {income: 0, expense: 0});

                        if (expense.amount >= 0) {
                            months[expense.month].income += expense.amount;
                        } else {
                            months[expense.month].expense += Math.abs(expense.amount);
                        }
                        delete months['month'];
                        delete months['amount'];
                        return months;
                    });
                stats = Object.keys(stats).map(key => {
                    return {key: key, income: stats[key].income, expense: stats[key].expense};
                });
            }


            console.log("Stats: ", stats);
        }
        return stats;

    }

    getCategoryStats(expenses) {
        var stats = [];

        if (expenses.length > 0) {

            if (expenses.length == 1) {
                stats.push(expenses[0].categories.map(category => {return {key: category, amount: expenses[0].amount}}));

            } else {
                expenses.map(expense => {
                    var amount = Math.abs(parseFloat(expense.amount));
                    if(expense.categories.length > 0)
                        return expense.categories.map(category => {return {category, amount: amount}});
                    else{
                        return [{category: "Others", amount: amount}];
                    }
                }).reduce((categories, categoryList) => {
                    console.log("Categories", categories);
                    categoryList.forEach(category =>{
                        stats[category.category] = stats[category.category] || 0;
                        stats[category.category] += category.amount;
                    });
                    return categories;
                });

                stats = Object.keys(stats).map(key => {
                    return {key: key, total: stats[key]};
                });
            }

            console.log("Category stats: ", stats);

        }
        return stats;

    }

    render() {

        var monthly_total_stats = this.getMonthlyTotalStats(this.props.data);
        var monthly_total_stats_options = {
            title: "Monthly statistics",
            subtitle: "Overview of the monthly total savings",
            value: { name: "total", color: "#8884d8"}
        };
        var monthly_stats = this.getMonthlyStats(this.props.data);
        var monthly_stats_options = {
            title: "Monthly income/expenses",
            subtitle: "Overview of the monthly incomes vs. expenses",
            value1: { name: "income", color: "green"}, value2: {name: "expense", color: "red"}
        };

        var category_stats = this.getCategoryStats(this.props.data);
        var category_stats_options = {
            title: "Category statistics",
            subtitle: "Overview of the categories",
            value: { name: "total", color: "#8884d8"}
        };

        var monthly_saving = 0;
        monthly_total_stats.forEach( stat => {
            monthly_saving += stat.total;
        });
        monthly_saving /= monthly_total_stats.length;

        return (
            <div className={styles.dashboard}>
                <div class="row">
                    <div class="col-md-3">
                        <div className={styles.summary}>
                            <h5>Monthly Savings</h5>
                            <p className={styles.subtitle}>Average saving for each month</p>
                            <p className={styles.emphasis}>
                                    { monthly_saving }
                            </p>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div className={styles.summary}>
                            <h5>Monthly Savings</h5>
                            <p className={styles.subtitle}>Average saving for each month</p>
                            <p className={styles.emphasis}>
                                { monthly_saving }
                            </p>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div className={styles.summary}>
                            <h5>Monthly Savings</h5>
                            <p className={styles.subtitle}>Average saving for each month</p>
                            <p className={styles.emphasis}>
                                { monthly_saving }
                            </p>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div className={styles.summary}>
                            <h5>Monthly Savings</h5>
                            <p className={styles.subtitle}>Average saving for each month</p>
                            <p className={styles.emphasis}>
                                { monthly_saving }
                            </p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <ExpenseGraph data={monthly_total_stats} type="line" graphOptions={monthly_total_stats_options} />
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <ExpenseGraph data={monthly_stats} type="doublebar" graphOptions={monthly_stats_options} />
                    </div>
                    <div class="col-md-6">
                        <ExpenseGraph data={category_stats} type="pie" graphOptions={category_stats_options} />
                    </div>
                </div>

            </div>
        )
    }
}

export default ExpenseDashboard;
