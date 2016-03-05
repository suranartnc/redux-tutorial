export default store => next => action => {
	console.log('LOGGER1: dispatching', action);
	next(action);
}