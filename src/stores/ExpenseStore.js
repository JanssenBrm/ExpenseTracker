var AppDispatcher = require('../dispatcher/dispatcher');
var EventEmitter = require('events').EventEmitter;
var merge = require('merge');
var ExpenseStoreActions = require('../constants/ExpenseStoreConstants');

var expenseList = [];
var expenseActionResult = [];


function setExpenses(data){
    expenseList = data.expenses;
    console.log("EXPENSE STORE - Loaded new expenses", expenseList);
    return expenseList;
}

function filterExpenses(data){
    return expenseList.filter(expense =>{ return expense.title.toUpperCase().includes(data.filter.toUpperCase()) || expense.amount.toUpperCase().includes(data.filter.toUpperCase()) || expense.description.toUpperCase().includes(data.filter.toUpperCase())});
}

var ExpenseStore = merge(EventEmitter.prototype, {

    getExpenses(){
        return expenseActionResult;
    },

    emitChange: function(){
        this.emit('change');
    },

    addChangeListener: function(callback) {
        this.on('change', callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    }
});

AppDispatcher.register(function(payload){
    var action = payload.action;

    console.log('EXPENSE STORE - Retrieved action', action);

    switch(action.actionType){
        case ExpenseStoreActions.LOAD_EXPENSES:
            expenseActionResult = setExpenses(action.data);
            break;
        case ExpenseStoreActions.FILTER_EXPENSES:
            expenseActionResult = filterExpenses(action.data);
            break;
        default:
            return true;

    }
    ExpenseStore.emitChange();
    return true;
});

module.exports = ExpenseStore;