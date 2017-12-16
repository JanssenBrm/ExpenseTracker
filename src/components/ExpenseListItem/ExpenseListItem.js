import React, { Component } from 'react';
import marked from 'marked';
import {Avatar, Divider, ListItem} from "material-ui";
import {ActionPayment} from "material-ui/svg-icons/index";
import styles from "../../css/expenselist.css";


class ExpenseListItem extends Component {
    rawMarkup() {
        let rawMarkup = marked(this.props.children.toString());
        return { __html: rawMarkup };
    }
    render() {
        return (
            <div>
                <ListItem
                    value={3}
                    primaryText={
                        <p>{this.props.expense.title || "Expense"}<span className={parseInt(this.props.expense.amount) > 0 ? styles.listAmountPos : styles.listAmountNeg}>{this.props.expense.amount}</span></p>
                    }
                    secondaryText={
                        <p>{this.props.expense.date} <span dangerouslySetInnerHTML={this.rawMarkup()}/></p>
                    }
                    secondaryTextLines={5}
                    leftAvatar={<Avatar icon={<ActionPayment />}/>}
                />
                <Divider/>
            </div>
        )
    }
}

export default ExpenseListItem;