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

// Dispatch some actions
store.dispatch({ 
	type: 'INCREMENT',
	size: 1
});

store.dispatch({ 
	type: 'INCREMENT',
	size: 5 
});

store.dispatch({ 
	type: 'DECREMENT',
	size: 1
});