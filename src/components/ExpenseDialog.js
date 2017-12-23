import React, { Component } from 'react';
import marked from 'marked';
import {
    AutoComplete, Avatar, Chip, Dialog, Divider, FlatButton, ListItem, RefreshIndicator
} from "material-ui";
import {ContentAdd, AlertError, ActionDone} from "material-ui/svg-icons/index";
import styles from "../css/expenselist.css";
import * as ExpenseStoreActions from "../actions/ExpenseStoreActions";
import {green500, red500} from "material-ui/styles/colors";

function getInitComponentstate(props)
{
    return {
        edit : false,
        categorySearch: '',
        categoryDataSource: [],
        expense:  JSON.parse(JSON.stringify(props.expense)),
        open: props.selected,
        status: ''

    }
}

class ExpenseDialog extends Component {

    constructor(props) {
        super(props);
        this.state = getInitComponentstate(this.props);

    }

    rawMarkup() {
        let rawMarkup = marked(this.props.children.toString());
        return { __html: rawMarkup };
    }
    render() {
        const title = this.props.expense.title || "Expense";

        const categoryEditor = (
            <AutoComplete
                hintText="Add category"
                searchText={this.state.categorySearch}
                dataSource={this.state.categoryDataSource}
                onUpdateInput={this.addSuggestion.bind(this)}
                onNewRequest={this.addCategories.bind(this)}
                autoFocus
            />
        );

        this.state.expense.categories = this.state.expense.categories || [];
        const categoryList = this.state.expense.categories.map(category =>{
            return (
                <Chip
                    key={category}
                    onRequestDelete={() => {this.deleteCategory(category)}}
                    className={styles.chip}
                >
                    {category}
                </Chip>
            );
        });

        const editCategories = (
            <span onClick={() => {this.enableEdit()}}><ContentAdd /></span>
        );

        const categoryOverview = (
            <div className={styles.categoryList}>{this.state.expense.categories.length > 0 ? categoryList : 'No categories'}{this.state.edit ? '' : editCategories}</div>
        );

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={() => {this.cancelDialog()}}
            />,
            <FlatButton
                label="Save"
                primary={true}
                keyboardFocused={true}
                onClick={() => {this.saveExpense()}}
            />,
        ];

        const loadingMessage = (
            <span className={styles.loading}><RefreshIndicator top={-10} left={250} status="loading"/> Loading</span>
        );

        const okMessage = (
            <span className={styles.ok}><ActionDone className={styles.doneIcon} color={green500} /> Expense saved!</span>
        );

        const errorMessage = (
            <span className={styles.error}><AlertError className={styles.errorIcon} color={red500} />Something went wrong while saving the expense...</span>
        )

        let statusMessage;
        if(this.state.status === 'LOADING')
            statusMessage = loadingMessage;
        else if(this.state.status === 'ERROR')
            statusMessage = errorMessage;
        else if(this.state.status === 'OK')
            statusMessage = okMessage;



        return (
            <Dialog
                title="Detailed expense info"
                actions={actions}
                modal={false}
                open={this.props.selected}
                onRequestClose={() => {this.closeDialog()}}
            >

                <table cellSpacing={10} cellPadding={10} className={styles.expenseTable}>
                    <tbody>
                    <tr>
                        <th>Title:</th>
                        <td>{title}</td>
                    </tr>
                    <tr>
                        <th>Amount:</th>
                        <td>{this.props.expense.amount}</td>
                    </tr>
                    <tr>
                        <th>Description:</th>
                        <td><span dangerouslySetInnerHTML={this.rawMarkup()}/></td>
                    </tr>
                    <tr>
                        <th>Categories:</th>
                        <td></td>
                    </tr>
                    <tr>
                        <td colSpan={2} >{categoryOverview}</td>
                    </tr>
                    <tr>
                        <td colSpan={2} >{this.state.edit ? categoryEditor : ''}</td>
                    </tr>
                    <tr>
                        <td colSpan={2} >{statusMessage}</td>
                    </tr>
                    </tbody>
                </table>
            </Dialog>
        )
    }

    closeDialog(){
        this.disableEdit();
        this.resetStatus();
        this.props.closeDialog();
    }

    saveExpense(){
        this.state.status = 'LOADING';
        this.setState(this.state);
        ExpenseStoreActions.saveExpense(this.state.expense)
            .then(result => {
                if (result === 'OK') {
                    this.setOKStatus();
                    setTimeout(() =>{
                        this.resetStatus();
                        this.closeDialog();
                    }, 1000);

                } else{
                    this.setErrorStatus(result);
                }
            })


    }

    cancelDialog(){
        this.state = getInitComponentstate(this.props);
        this.setState(this.state);
        this.closeDialog();
    }

    enableEdit(){
        this.state.edit = true;
        this.setState(this.state);
    }

    disableEdit(){
        this.state.edit = false;
        this.setState(this.state);
    }

    resetStatus(){
        this.state.status = '';
        this.state.errorMessage = '';
        this.setState(this.state);
    }
    setErrorStatus(message){
        this.state.status = 'ERROR';
        this.setState(this.state);
    }

    setOKStatus(message){
        this.state.status = 'OK';
        this.setState(this.state);
    }

    addSuggestion(searchText, dataSource, params){
        this.state.categoryDataSource.pop();
        this.state.categoryDataSource.push(searchText);
        this.state.categorySearch = searchText;
        this.setState(this.state);
    }

    addCategories(categories, index){

        categories.split(",").forEach( category => {
            this.state.categoryDataSource.push(category);
            this.state.expense.categories.push(category);
        });

        this.state.categorySearch = '';
        this.setState(this.state);
    }

    deleteCategory(delCategory){
        this.state.expense.categories = this.state.expense.categories.filter(category => { return category !== delCategory; });
        this.setState(this.state);
    }
}

export default ExpenseDialog;