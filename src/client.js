import { createStore, combineReducers, applyMiddleware } from 'redux';
import mockData from './utils/mockData';

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
		case 'GET_ARTICLE':
			return mockData.filter(article => {
				return article.id === action.id
			})[0];
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

function getArticle(id) {
	return {
		type: 'GET_ARTICLE',
		id
	}
}

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Provider, connect } from 'react-redux';

class App extends Component {

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
						</article>
					</div>
					<div className="col-md-4">
						{ this.props.articleList.map((article, index) => {
							return (
								<article key={ article.id }>
									<h2><a href="#" onClick={this.handleArticleClick.bind(this, article.id)}>{ article.title }</a></h2>
									<button onClick={this.handleArticleDelete.bind(this, article.id)}>X</button>
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
	getArticle
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