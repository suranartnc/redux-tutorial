import React from 'react';

export default function({article}) {
	return (
		<article>
			<h1>{ article.title }</h1>
			<div dangerouslySetInnerHTML={{ __html: article.body }} />
		</article>
	);
}