export default function(state = [], action) {
	switch(action.type) {
		case 'GET_ARTICLE_LATEST':
			return action.data || state;
		default:
			return state;
	}
}