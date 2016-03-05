import { createStore, combineReducers, applyMiddleware } from 'redux';
import mockData from './utils/mockData';

// Reducer
const rootReducer = combineReducers({
	counter_1: counter1Reducer,
	counter_2: counter2Reducer,
	articleList: articleListReducer
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

function articleListReducer(state = [], action) {
	switch(action) {
		default:
			return state;
	}
}

const logger1 = store => next => action => {
	console.log('LOGGER1: dispatching', action);
	next(action);
}

const logger2 = store => next => action => {
	next(action);
	console.log('LOGGER2: next state', store.getState());
}

// Store
const store = createStore(rootReducer, {
	counter_1: 100,
	counter_2: 1000,
	articleList: mockData
}, applyMiddleware(logger1, logger2));

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
				<div>
					{ this.props.articleList.map(function(article, index) {
						return (
							<article key={ article.id }>
								{ article.title }
							</article>
						);
					}) }
				</div>
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
		counter_2: state.counter_2,
		articleList: state.articleList
	}
}

ReactDOM.render(
	<Provider store={store}>
		<Container />
	</Provider>
	, document.getElementById('app'));