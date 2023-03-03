import React, { useState, useEffect } from 'react';
import { PagesList } from './PagesList';
import { ArticleDetails } from './ArticleDetails';

// import and prepend the api url to any fetch calls
import apiURL from '../api';

export const App = () => {

	const [pages, setPages] = useState([]);
	const [selectedArticle, setSelectedArticle] = useState(null);

	async function fetchPages(){
		try {
			const response = await fetch(`${apiURL}/wiki`);
			const pagesData = await response.json();
			setPages(pagesData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	async function fetchArticle(slug){
		try {
			const response = await fetch(`${apiURL}/wiki/${slug}`);
			const articleData = await response.json();
			setSelectedArticle(articleData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	useEffect(() => {
		fetchPages();
	}, []);

	return (
		<main>	
			<h1>WikiVerse</h1>
			{selectedArticle ? (
				<ArticleDetails article={selectedArticle} onBackClick={() => setSelectedArticle(null)} />
			) : (
				<>
					<h2>An interesting 📚</h2>
					<PagesList pages={pages} onArticleClick={fetchArticle} />
				</>
			)}
		</main>
	)
}

