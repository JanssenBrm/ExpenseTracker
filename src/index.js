import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import ExpenseOverview from "./components/ExpenseOverview/ExpenseOverview";
import { BrowserRouter as Router, Route } from 'react-router-dom';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path='/' component={ExpenseOverview} />
        </div>
    </Router>,
    document.getElementById('root'));
registerServiceWorker();
