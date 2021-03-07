import React, { Fragment, useState, useEffect, useCallback } from 'react';

import ApiKey from './ApiKey';
import ImageSubmitter from './ImageSubmitter';
import JSONOutput from './JSONOutput';
import TextOutput from './TextOutput';

import { recognizeText } from '../api';

const LS_KEY = 'vizor.google_api_key';

const App = props => {
	const [key, setKey] = useState(window.localStorage.getItem(LS_KEY));
	const [processing, setProcessing] = useState(false);
	const [results, setResults] = useState([]);

	const [precomposed, setPrecomposed] = useState(true);

	useEffect(() => {
		if (key) {
			window.localStorage.setItem(LS_KEY, key);
		} else {
			window.localStorage.removeItem(LS_KEY);
		}
	}, [key]);

	const process_files = useCallback(
		files => {
			if (!files && !files.length) {
				return;
			}

			if (
				files.length > 10 &&
				!confirm(
					`You're trying to process ${files.length} images at once. It may work or it may fail. Proceed?`
				)
			) {
				return;
			}

			setResults([]);
			setProcessing(true);
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
					setProcessing(false);
				})
				.catch(err => {
					console.error(err);
					setProcessing(false);
				});
		},
		[key]
	);

	return (
		<div className="container">
			<ApiKey onSetKey={key => setKey(key)} onRemoveKey={() => setKey(null)} api_key={key} />
			{key && (
				<Fragment>
					<ImageSubmitter process={process_files} processing={processing} />
					<TextOutput
						results={results}
						precomposed={precomposed}
						setPrecomposed={setPrecomposed}
					/>
					<JSONOutput results={results} />
				</Fragment>
			)}
		</div>
	);
};

export default App;
