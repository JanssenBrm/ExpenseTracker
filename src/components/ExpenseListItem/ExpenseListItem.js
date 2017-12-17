import React, { Component } from 'react';
import marked from 'marked';
import {Avatar, Divider, ListItem} from "material-ui";
import {ActionPayment} from "material-ui/svg-icons/index";
import styles from "../../css/expenselist.css";


class ExpenseListItem extends Component {

    constructor(props) {
        super(props);
        this.listItemSelected = this.listItemSelected.bind(this);
    }

    listItemSelected(event){
        console.log("Selected " + this.props.expense.title);
    }
    rawMarkup() {
        let rawMarkup = marked(this.props.children.toString());
        return { __html: rawMarkup };
    }
    render() {
        return (
            <div>
                <ListItem
                    onClick={this.listItemSelected}
                    value={3}
                    primaryText={
                        <p>{this.props.expense.title || "Expense"}<span className={parseFloat(this.props.expense.amount) > 0 ? styles.listAmountPos : styles.listAmountNeg}>{this.props.expense.amount}</span></p>
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