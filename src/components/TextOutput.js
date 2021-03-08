import React, { useCallback } from 'react';
import compose from '../util/compose.js';

import './TextOutput.css';

const has_async_clipboard = navigator.clipboard && navigator.clipboard.writeText;

const SERIALIZATION_INFO = {
	default: 'Show the text as received from the Google Vision API response.',
	prose: 'Merge lines into paragraphs; remove end-of-line hyphens.',
	verse: 'Maintain separate lines and hyphens.'
};

const TextOutput = ({ results, serialization, setSerialization, count }) => {
	if (!results || !results.length) {
		return null;
	}

	const text = results
		.map(r => {
			if (r.responses && r.responses[0] && r.responses[0].fullTextAnnotation) {
				return serialization === 'default'
					? r.responses[0].fullTextAnnotation.text
					: compose(r.responses[0].fullTextAnnotation, serialization === 'prose');
			}
			return `[Error processing: ${r.error ? r.error.message : ''}]`;
		})
		.join('\n\n§§\n\n')
		/*
			Remove excessive whitespace.
		 */
		.replace(/\n{3,}/g, '\n\n');

	const copyToClipboard = useCallback(
		e => {
			if (has_async_clipboard) {
				navigator.clipboard.writeText(text);
			}
		},
		[text]
	);

	return (
		<div className="text-output">
			<h2>Text output {count ? '(partial)' : ''}</h2>

			<p className="serialization-toggle">
				<label>
					<input
						type="radio"
						name="serialization"
						value="default"
						checked={serialization === 'default'}
						onChange={e => setSerialization(e.target.value)}
					/>
					Default
				</label>

				<label>
					<input
						type="radio"
						name="serialization"
						value="prose"
						checked={serialization === 'prose'}
						onChange={e => setSerialization(e.target.value)}
					/>
					Prose
				</label>

				<label>
					<input
						type="radio"
						name="serialization"
						value="verse"
						checked={serialization === 'verse'}
						onChange={e => setSerialization(e.target.value)}
					/>
					Verse
				</label>
			</p>

			<p className="t--info">
				{SERIALIZATION_INFO[serialization]} Pages are separated with the <strong>§§</strong>{' '}
				sequence of characters.
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
