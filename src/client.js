import { createStore, combineReducers, applyMiddleware } from 'redux';

// Reducer
const rootReducer = combineReducers({
	counter_1: counter1Reducer,
	counter_2: counter2Reducer  
});

function counter1Reducer(state = 0, action) {
    switch (action.type) {
        case 'INCREMENT_COUNTER_1':
            return state + action.size
        case 'DECREMENT_COUNTER_1':
            return state - action.size
        default:
            return state
    }
}

function counter2Reducer(state = 0, action) {
    switch (action.type) {
        case 'INCREMENT_COUNTER_2':
            return state + action.size
        case 'DECREMENT_COUNTER_2':
            return state - action.size
        default:
            return state
    }
}

const logger = store => next => action => {
	console.log('dispatching', action);
	next(action);
	console.log('next state', store.getState());
}

// Store
const store = createStore(rootReducer, {
	counter_1: 100,
	counter_2: 1000
}, applyMiddleware(logger));

// Action Creators
function incrementCounter1(size) {
	return { 
		type: 'INCREMENT_COUNTER_1',
		size
	}
}

function decrementCounter1(size) {
	return { 
		type: 'DECREMENT_COUNTER_1',
		size
	}
}

function incrementCounter2(size) {
	return { 
		type: 'INCREMENT_COUNTER_2',
		size
	}
}

function decrementCounter2(size) {
	return { 
		type: 'DECREMENT_COUNTER_2',
		size
	}
}

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Provider, connect } from 'react-redux';

class App extends Component {
	
	componentDidMount() {
		setInterval(() => {
			this.props.incrementCounter1(1);
			this.props.incrementCounter2(10);
		}, 1000);
	}

	render() {
		return (
			<div>
				<p>{ this.props.counter_1 }</p>
				<p>{ this.props.counter_2 }</p>
			</div>
		);
	}
}

const Container = connect(mapStateToProps, { 
	incrementCounter1, 
	decrementCounter1, 
	incrementCounter2, 
	decrementCounter2 
})(App);

function mapStateToProps(state) {
	return {
		counter_1: state.counter_1,
		counter_2: state.counter_2
	}
}

ReactDOM.render(
	<Provider store={store}>
		<Container />
	</Provider>
	, document.getElementById('app'));