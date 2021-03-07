import React, { useCallback } from 'react';

import './TextOutput.css';

const has_async_clipboard = navigator.clipboard && navigator.clipboard.writeText;

const TextOutput = ({ results }) => {
	if (!results || !results.length) {
		return null;
	}
	const text = results
		.map(r => {
			if (r.responses && r.responses[0] && r.responses[0].fullTextAnnotation) {
				return r.responses[0].fullTextAnnotation.text;
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
