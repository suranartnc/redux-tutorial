export default store => next => action => {
	next(action);
	console.log('LOGGER2: next state', store.getState());
}