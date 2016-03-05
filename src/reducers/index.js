import { combineReducers } from 'redux';

import articleListReducer from './articleListReducer';
import articleActiveReducer from './articleActiveReducer';

const rootReducer = combineReducers({
	articleList: articleListReducer,
	articleActive: articleActiveReducer
});


export default rootReducer;