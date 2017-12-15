var AppDispatcher = require('../dispatcher/dispatcher');
var EventEmitter = require('events').EventEmitter;
var merge = require('merge');
var ExpenseStoreActions = require('../constants/ExpenseStoreConstants');

var _expenses = [];


function setExpenses(data){
    _expenses = data.expenses;
    console.log("EXPENSE STORE - Loaded new expenses", _expenses);
}

var ExpenseStore = merge(EventEmitter.prototype, {

    getExpenses(){
        return _expenses;
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
            setExpenses(action.data);
            break;
        default:
            return true;

    }
    ExpenseStore.emitChange();
    return true;
});

module.exports = ExpenseStore;