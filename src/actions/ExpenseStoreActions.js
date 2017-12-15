import DATA from '../constants/data.js';
import * as axios from 'axios';

var AppDispatcher = require('../dispatcher/dispatcher');
var ExpenseStoreConstants = require('../constants/ExpenseStoreConstants');

export function getExpenses(){

    console.log('ACTION - Get expenses');
    console.log(DATA);

    axios.get('/api/expenses')
        .then(function (response) {
            console.log(response);
            AppDispatcher.handleExpenseAction({
                actionType: ExpenseStoreConstants.LOAD_EXPENSES,
                data: {"expenses": response.data}
            })
        })
        .catch(function (error) {
            console.log(error);
        });


};
