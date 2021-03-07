import React, { useCallback } from 'react';

import './JSONOutput.css';

const has_async_clipboard = navigator.clipboard && navigator.clipboard.writeText;

const JSONOutput = ({ results }) => {
	if (!results || !results.length) {
		return null;
	}

	const json = JSON.stringify(
		results,
		(key, value) => {
			if (key === 'boundingPoly' || key === 'boundingBox') {
				return '…';
			}
			return value;
		},
		2
	);

	const copyToClipboard = useCallback(
		e => {
			if (has_async_clipboard) {
				navigator.clipboard.writeText(json);
			}
		},
		[json]
	);

	return (
		<div className="json-output">
			<h2>JSON output</h2>
			<p className="t--info">
				Some properties, such as <var>boundingBox</var> and <var>boundingPoly</var>, are
				omitted.
			</p>
			<details>
				<summary>Click to expand JSON output</summary>
				<pre>{json}</pre>
			</details>
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

export default JSONOutput;
