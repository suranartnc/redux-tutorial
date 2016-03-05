export default function(state = {}, action) {
	switch(action.type) {
		case 'GET_ARTICLE':
			return action.data||state;
		default:
			return state;
	}
}