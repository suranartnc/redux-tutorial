export function getArticle(id) {
	return {
		type: 'GET_ARTICLE',
		promise: fetch(`http://localhost:3004/articles/${id}`)
	}
}

export function getArticleLatest() {
	return {
		type: 'GET_ARTICLE_LATEST',
		promise: fetch('http://localhost:3004/articles')
	}
}