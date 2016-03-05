import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

// Reducer
import rootReducer from './reducers';

// Middlewares
import logger1 from './middlewares/logger1';
import promiseResolver from './middlewares/promiseResolver';
import logger2 from './middlewares/logger2';

// Container
import App from './containers/App';

const store = createStore(rootReducer, applyMiddleware(logger1, promiseResolver, logger2));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>
	, document.getElementById('app'));