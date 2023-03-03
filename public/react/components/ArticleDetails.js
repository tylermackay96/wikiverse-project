import React from 'react';

export const ArticleDetails = ({ article, onBackClick }) => {
	if (!article) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h2>{article.title}</h2>
			<p>Author: {article.author}</p>
			<p>Content: {article.content}</p>
			<p>Tags: {article.tags.join(', ')}</p>
			<p>Date: {new Date(article.createdAt).toLocaleDateString()}</p>
			<button onClick={onBackClick}>Back to Wiki List</button>
		</div>
	)
}


	