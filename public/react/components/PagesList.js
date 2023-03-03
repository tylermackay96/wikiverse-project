import React from 'react';

export const PagesList = ({ pages, onArticleClick }) => {
	return (
		<ul>
			{pages.map(page => (
				<li key={page.slug} onClick={() => onArticleClick(page.slug)}>
					{page.title}
				</li>
			))}
		</ul>
	)
}

