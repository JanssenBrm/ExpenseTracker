var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();

AppDispatcher.handleExpenseAction = function(action) {
    this.dispatch({
        source: 'EXPENSE_ACTION',
        action: action
    });
}

module.exports = AppDispatcher;