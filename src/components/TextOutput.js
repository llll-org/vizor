import React, { useState, useCallback } from 'react';

import './TextOutput.css';

const has_async_clipboard = navigator.clipboard && navigator.clipboard.writeText;

const compose = annotation => {
	return annotation.pages.map(page => {
		return page.blocks
			.map(block => {
				return block.paragraphs
					.map(para => {
						return para.words
							.map(word => {
								return word.symbols.map(s => s.text).join('');
							})
							.join(' ');
					})
					.join('\n\n');
			})
			.join('\n\n');
	});
};

const TextOutput = ({ results }) => {
	if (!results || !results.length) {
		return null;
	}

	const [precomposed, setPrecomposed] = useState(true);

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

	return (
		<div className="text-output">
			<h2>Text output</h2>
			<p className="t--info">
				Pages are separated with the <strong>§§</strong> sequence of characters.
			</p>
			<p>
				<label>
					<input
						type="checkbox"
						checked={precomposed}
						onChange={e => setPrecomposed(e.target.checked)}
					/>
					Precomposed
				</label>
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
