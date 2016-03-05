import React, { Component } from 'react';

import { connect } from 'react-redux';

import * as articleActions from '../actions/articleActions';

import Article from '../components/Article';
import ArticleList from '../components/ArticleList';

class App extends Component {

	constructor(props) {
		super(props);
		this.handleArticleClick = this.handleArticleClick.bind(this);
	}
	
	componentDidMount() {
		this.props.getArticleLatest();
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
						<Article article={this.props.articleActive} />
					</div>
					<div className="col-md-4">
						<ArticleList articles={this.props.articleList} handleArticleClick={this.handleArticleClick} />
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		articleList: state.articleList,
		articleActive: state.articleActive
	}
}

export default connect(mapStateToProps, articleActions)(App);