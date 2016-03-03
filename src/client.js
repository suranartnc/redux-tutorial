import { createStore } from 'redux';

// Reducer
function reducer(state = 0, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + action.size
        case 'DECREMENT':
            return state - action.size
        default:
            return state
    }
}

// Store
const store = createStore(reducer);

// Subscribe to the updates
store.subscribe(function() {
    console.log(store.getState());
});

// Action Creators
function increment(size) {
	return { 
		type: 'INCREMENT',
		size
	}
}

function decrement(size) {
	return { 
		type: 'DECREMENT',
		size
	}
}

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Provider, connect } from 'react-redux';

class App extends Component {
	
	componentDidMount() {
		setInterval(() => {
			store.dispatch(increment(1));
		}, 1000);
	}

	render() {
		return (
			<div>{ this.props.counter }</div>
		);
	}
}

const Container = connect(mapStateToProps)(App);

function mapStateToProps(state) {
	return {
		counter: state
	}
}

ReactDOM.render(
	<Provider store={store}>
		<Container />
	</Provider>
	, document.getElementById('app'));