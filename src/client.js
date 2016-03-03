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

// Dispatch some Actions
store.dispatch(increment(1));
store.dispatch(increment(5));
store.dispatch(decrement(1));