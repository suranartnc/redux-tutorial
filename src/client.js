import { createStore, combineReducers, applyMiddleware } from 'redux';
import mockData from './utils/mockData';

// Reducer
const rootReducer = combineReducers({
	articleList: articleListReducer,
	articleActive: articleActiveReducer
});

function articleListReducer(state = [], action) {
	switch(action.type) {
		case 'DELETE_ARTICLE':
			return state.filter(article => {
				return article.id !== action.id
			});
		default:
			return state;
	}
}

function articleActiveReducer(state = {}, action) {
	switch(action.type) {
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
	articleList: mockData,
	articleActive: mockData[0]
}, applyMiddleware(logger1, logger2));

// Action Creators
function deleteArticle(id) {
	return {
		type: 'DELETE_ARTICLE',
		id
	}
}

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Provider, connect } from 'react-redux';

class App extends Component {

	handleArticleClick(id, event) {
		event.preventDefault();
		this.props.deleteArticle(id);
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-8">
						<article>
							<h1>{ this.props.articleActive.title }</h1>
						</article>
					</div>
					<div className="col-md-4">
						{ this.props.articleList.map((article, index) => {
							return (
								<article key={ article.id }>
									<h2>{ article.title }</h2>
									<button onClick={this.handleArticleClick.bind(this, article.id)}>X</button>
								</article>
							);
						}) }
					</div>
				</div>
			</div>
		);
	}
}

const Container = connect(mapStateToProps, { 
	deleteArticle 
})(App);

function mapStateToProps(state) {
	return {
		articleList: state.articleList,
		articleActive: state.articleActive
	}
}

ReactDOM.render(
	<Provider store={store}>
		<Container />
	</Provider>
	, document.getElementById('app'));