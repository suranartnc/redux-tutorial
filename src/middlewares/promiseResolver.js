export default store => next => action => {
	
	const { promise, ...rest } = action;

	if (!promise) {
		return next(action);
	}

	promise.then(response => {
    	if (response.status >= 400) {
      		throw new Error("Bad response from server");
      		return false;
    	}
    	return response.json();
  	}).then(data => {
    	return next({...rest, data});
  	});
}