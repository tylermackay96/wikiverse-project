import React, { useState, useEffect } from 'react';
import { PagesList } from './PagesList';
import { ArticleDetails } from './ArticleDetails';

// import and prepend the api url to any fetch calls
import apiURL from '../api';

export const App = () => {

	const [pages, setPages] = useState([]);
	const [selectedArticle, setSelectedArticle] = useState(null);
	const [isAddingArticle, setIsAddingArticle] = useState(false);
	const [newArticleData, setNewArticleData] = useState({
		title: '',
		content: '',
		authorName: '',
		authorEmail: '',
		tags: ''
	});

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

	async function addArticle() {
		try {
			const response = await fetch(`${apiURL}/wiki`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					...newArticleData
				})
			});
			const addedArticle = await response.json();
			setPages([...pages, addedArticle]);
			setNewArticleData({
				title: '',
				content: '',
				authorName: '',
				authorEmail: '',
				tags: ''
			});
			setIsAddingArticle(false);
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
			{isAddingArticle ? (
				<div>
					<h2>Add New Article</h2>
					<form onSubmit={(e) => {
						e.preventDefault();
						addArticle();
					}}>
						<label>
							Title:
							<input
								type="text"
								value={newArticleData.title}
								onChange={(e) => setNewArticleData({...newArticleData, title: e.target.value})}
								required
							/>
						</label>
						<label>
							Content:
							<textarea
								value={newArticleData.content}
								onChange={(e) => setNewArticleData({...newArticleData, content: e.target.value})}
								required
							/>
						</label>
						<label>
							Author Name:
							<input
								type="text"
								value={newArticleData.authorName}
								onChange={(e) => setNewArticleData({...newArticleData, authorName: e.target.value})}
								required
							/>
						</label>
						<label>
							Author Email:
							<input
								type="email"
								value={newArticleData.authorEmail}
								onChange={(e) => setNewArticleData({...newArticleData, authorEmail: e.target.value})}
								required
							/>
						</label>
						<label>
							Tags:
							<input
								type="text"
								value={newArticleData.tags}
								onChange={(e) => setNewArticleData({...newArticleData, tags: e.target.value})}
required
/>
</label>
<button type="submit">Add Article</button>
<button onClick={() => setIsAddingArticle(false)}>Cancel</button>
</form>
</div>
) : (
<>
<PagesList pages={pages} onSelectPage={fetchArticle} onAddPage={() => setIsAddingArticle(true)} />
<ArticleDetails article={selectedArticle} />
</>
)}
</main>
);
};
