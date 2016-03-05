import { createStore, combineReducers, applyMiddleware } from 'redux';

require('es6-promise').polyfill();
require('isomorphic-fetch');

// Reducer
const rootReducer = combineReducers({
	articleList: articleListReducer,
	articleActive: articleActiveReducer
});

/*
How to avoid mutable data

Add
	- Object in Array - array.prototype.concat()
Get
	- Object in Array - array.prototype.filter()
Update
	- Object in Array - array.prototype.map()
	- Object - {...myObject, property: newValue}, 
	           Object.assign({}, myObject, { property: newValue })
Delete
	- Object in Array - array.prototype.filter()
	- Property in Object - delete myObject.propertyName
*/

function articleListReducer(state = [], action) {
	switch(action.type) {
		case 'GET_ARTICLE_LATEST':
			return action.data||state;
		default:
			return state;
	}
}

function articleActiveReducer(state = {}, action) {
	switch(action.type) {
		case 'GET_ARTICLE':
			return action.data||state;
		default:
			return state;
	}
}

const logger1 = store => next => action => {
	console.log('LOGGER1: dispatching', action);
	next(action);
}

const promiseMiddleware = store => next => action => {
	
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

const logger2 = store => next => action => {
	next(action);
	console.log('LOGGER2: next state', store.getState());
}

// Store
const store = createStore(rootReducer, {
	articleList: [],
	articleActive: {}
}, applyMiddleware(logger1, promiseMiddleware, logger2));

// Action Creators
function deleteArticle(id) {
	return {
		type: 'DELETE_ARTICLE',
		id
	}
}

function getArticle(id) {
	return {
		type: 'GET_ARTICLE',
		promise: fetch(`http://localhost:3004/articles/${id}`)
	}
}

function getArticleLatest() {
	return {
		type: 'GET_ARTICLE_LATEST',
		promise: fetch('http://localhost:3004/articles')
	}
}

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Provider, connect } from 'react-redux';

class App extends Component {

	componentDidMount() {
		this.props.getArticleLatest();
	}

	handleArticleDelete(id, event) {
		event.preventDefault();
		this.props.deleteArticle(id);
	}

	handleArticleClick(id, event) {
		event.preventDefault();
		this.props.getArticle(id);
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-8">
						<article>
							<h1>{ this.props.articleActive.title }</h1>
							<div dangerouslySetInnerHTML={{ __html: this.props.articleActive.body }} />
						</article>
					</div>
					<div className="col-md-4">
						{ this.props.articleList.map((article, index) => {
							return (
								<article key={ article.id }>
									<h3><a href="#" onClick={this.handleArticleClick.bind(this, article.id)}>{ article.title }</a></h3>
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
	deleteArticle,
	getArticle,
	getArticleLatest
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