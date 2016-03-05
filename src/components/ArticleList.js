import React from 'react';

export default function({articles, handleArticleClick}) {
	return (
		<div>
			{ articles.map((article, index) => {
				return (
					<article key={ article.id }>
						<h3><a href="#" onClick={handleArticleClick.bind(null, article.id)}>{ article.title }</a></h3>
					</article>
				);
			}) }
		</div>
	);
}