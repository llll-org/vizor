import React, { useState, useEffect } from 'react';

import { recognizeText } from '../api';

import JSONOutput from './JSONOutput';
import TextOutput from './TextOutput';

import './ImageSubmitter.css';

const ImageSubmitter = props => {
	let [results, setResults] = useState([]);
	const { api_key } = props;

	let process_files = dataTransfer => {
		const { files } = dataTransfer;
		Promise.all(
			[...files].map(file =>
				new Promise(resolve => {
					const reader = new FileReader();
					reader.addEventListener('load', () => resolve(btoa(reader.result)));
					reader.readAsBinaryString(file);
				}).then(imageData => recognizeText(api_key, imageData))
			)
		)
			.then(results => {
				setResults(results.map(r => r.data));
			})
			.catch(err => console.error(err));
	};

	let handleChange = e => {
		process_files(e.target);
	};

	useEffect(() => {
		const dragover = e => e.preventDefault();
		const drop = e => {
			e.preventDefault();
			process_files(e.dataTransfer);
		};

		document.addEventListener('dragover', dragover);
		document.addEventListener('drop', drop);
		return () => {
			document.removeEventListener('dragover', dragover);
			document.removeEventListener('drop', drop);
		};
	}, []);

	return (
		<div className="image-submitter">
			<input type="file" onChange={handleChange} multiple />

			{results.length && (
				<TextOutput
					text={results.map(r => r.responses[0].fullTextAnnotation.text).join('\n')}
				/>
			)}
		</div>
	);
};

export default ImageSubmitter;
