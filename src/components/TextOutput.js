import React, { useCallback } from 'react';
import compose from '../util/compose.js';

import './TextOutput.css';

const has_async_clipboard = navigator.clipboard && navigator.clipboard.writeText;

const TextOutput = ({ results, precomposed, setPrecomposed }) => {
	if (!results || !results.length) {
		return null;
	}

	const text = results
		.map(r => {
			if (r.responses && r.responses[0] && r.responses[0].fullTextAnnotation) {
				return precomposed
					? r.responses[0].fullTextAnnotation.text
					: compose(r.responses[0].fullTextAnnotation);
			}
			return `[Error processing, check JSON output]`;
		})
		.join('\n§§\n');

	const copyToClipboard = useCallback(
		e => {
			if (has_async_clipboard) {
				navigator.clipboard.writeText(text);
			}
		},
		[text]
	);

	const togglePrecomposed = useCallback(e => setPrecomposed(e.target.value === 'true'), [
		setPrecomposed
	]);

	return (
		<div className="text-output">
			<h2>Text output</h2>

			<p class="serialization-toggle">
				<label>
					<input
						type="radio"
						name="precomposed"
						value="true"
						checked={precomposed}
						onChange={togglePrecomposed}
					/>
					Default serialization
				</label>

				<label>
					<input
						type="radio"
						name="precomposed"
						value="false"
						checked={!precomposed}
						onChange={togglePrecomposed}
					/>
					Custom serialization
				</label>
			</p>

			<p className="t--info">
				{precomposed
					? 'Show the text as received on the Google Vision API response. '
					: 'Merge lines into paragraphs. '}
				Pages are separated with the <strong>§§</strong> sequence of characters.
			</p>

			<textarea value={text} readOnly />
			{has_async_clipboard && (
				<p>
					<button type="button" onClick={copyToClipboard}>
						Copy to clipboard
					</button>
				</p>
			)}
		</div>
	);
};

export default TextOutput;
