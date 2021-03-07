import React, { Fragment, useState, useEffect, useCallback } from 'react';

import ApiKey from './ApiKey';
import ImageSubmitter from './ImageSubmitter';
import JSONOutput from './JSONOutput';
import TextOutput from './TextOutput';

import { recognizeText } from '../api';

const LS_KEY = 'vizor.google_api_key';

const App = props => {
	const [key, setKey] = useState(window.localStorage.getItem(LS_KEY));
	const [results, setResults] = useState([]);

	useEffect(() => {
		if (key) {
			window.localStorage.setItem(LS_KEY, key);
		} else {
			window.localStorage.removeItem(LS_KEY);
		}
	}, [key]);

	const process_files = useCallback(
		files => {
			Promise.all(
				[...files]
					.filter(f => f.type.match(/^image\//))
					.map(file =>
						new Promise(resolve => {
							const reader = new FileReader();
							reader.addEventListener('load', () => resolve(btoa(reader.result)));
							reader.readAsBinaryString(file);
						}).then(imageData => recognizeText(key, imageData))
					)
			)
				.then(results => {
					setResults(results.map(r => r.data));
				})
				.catch(err => console.error(err));
		},
		[key]
	);

	return (
		<div className="container">
			<ApiKey onSetKey={key => setKey(key)} onRemoveKey={() => setKey(null)} api_key={key} />
			{key && (
				<Fragment>
					<ImageSubmitter process={process_files} />
					<TextOutput results={results} />
					<JSONOutput results={results} />
				</Fragment>
			)}
		</div>
	);
};

export default App;
