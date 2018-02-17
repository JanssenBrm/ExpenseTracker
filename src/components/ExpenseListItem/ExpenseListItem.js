import React, { Component } from 'react';
import marked from 'marked';
import {Avatar, Dialog, Divider, FlatButton, ListItem} from "material-ui";
import {ActionPayment} from "material-ui/svg-icons/index";
import styles from "../../css/expenselist.css";
import ExpenseDialog from "../ExpenseDialog";


class ExpenseListItem extends Component {

    state = {
        selected: false,
    };


    constructor(props) {
        super(props);
        this.listItemSelected = this.listItemSelected.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
    }

    listItemSelected(event){
        this.setState({selected: true});
    }
    closeDialog(event){
        this.setState({selected: false});
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
                        <span>{this.props.expense.title || "Expense"}<span className={parseFloat(this.props.expense.amount) > 0 ? styles.listAmountPos : styles.listAmountNeg}>{this.props.expense.amount}</span></span>
                    }
                    secondaryText={

                        <p>{this.props.expense.date} <span dangerouslySetInnerHTML={this.rawMarkup()}/><br />
                            {this.props.expense.categories? this.props.expense.categories.join(', ') : "No categories"}</p>
                    }
                    secondaryTextLines={8}
                    leftAvatar={<Avatar icon={<ActionPayment />}/>}

                />
               <ExpenseDialog  expense={ this.props.expense } selected={this.state.selected} closeDialog={() => {this.closeDialog()}}>
                   { this.props.expense.description}
               </ExpenseDialog>

                <Divider/>
            </div>
        )
    }
}

export default ExpenseListItem;