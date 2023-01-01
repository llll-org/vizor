import React, { Fragment, useState, useEffect, useCallback } from 'react';

import ApiKey from './ApiKey.js';
import ImageSubmitter from './ImageSubmitter.js';
import JSONOutput from './JSONOutput.js';
import TextOutput from './TextOutput.js';

import { recognizeText } from '../api.js';
import getImageData from '../util/get-image-data.js';

import './App.css';

const LS_KEY = 'vizor.google_api_key';
const LS_SERIALIZATION = 'vizor.serialization';

const App = props => {
	const [key, setKey] = useState(window.localStorage.getItem(LS_KEY));
	const [serialization, setSerialization] = useState(
		window.localStorage.getItem(LS_SERIALIZATION) || 'default'
	);

	const [count, setCount] = useState(0);
	const [processedCount, setProcessedCount] = useState(0);

	const [results, setResults] = useState([]);

	useEffect(() => {
		if (key) {
			window.localStorage.setItem(LS_KEY, key);
		} else {
			window.localStorage.removeItem(LS_KEY);
		}
	}, [key]);

	useEffect(() => {
		window.localStorage.setItem(LS_SERIALIZATION, serialization);
	}, [serialization]);

	const process_files = useCallback(
		files => {
			if (!files && !files.length) {
				return;
			}

			setResults([]);
			setCount(files.length);
			setProcessedCount(0);

			let images = [...files].filter(f => f.type.match(/^image\//));

			let chain = images.reduce((chain, img) => {
				return chain.then(results => {
					setProcessedCount(curr => curr + 1);
					return getImageData(img)
						.then(data => recognizeText(key, data))
						.then(response => response.json())
						.then(result => {
							let res = results.concat(result);
							setResults(res);
							return res;
						})
						.catch(error => {
							let res = results.concat({ error });
							setResults(res);
							return res;
						});
				});
			}, Promise.resolve([]));

			chain
				.then(results => {
					setResults(results);
					setCount(0);
				})
				.catch(err => {
					console.error(err);
					setCount(0);
				});
		},
		[key]
	);

	return (
		<Fragment>
			<ApiKey onSetKey={key => setKey(key)} onRemoveKey={() => setKey(null)} api_key={key} />
			{key && (
				<Fragment>
					<ImageSubmitter
						process={process_files}
						processedCount={processedCount}
						count={count}
					/>
					<TextOutput
						results={results}
						count={count}
						serialization={serialization}
						setSerialization={setSerialization}
					/>
					<JSONOutput results={results} count={count} />
				</Fragment>
			)}
		</Fragment>
	);
};

export default App;
