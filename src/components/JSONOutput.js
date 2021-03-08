import React, { useState } from 'react';

import './JSONOutput.css';

const has_async_clipboard = navigator.clipboard && navigator.clipboard.writeText;

const serialize = results =>
	JSON.stringify(
		results,
		(key, value) => {
			if (key === 'boundingPoly' || key === 'boundingBox' || key === 'textAnnotations') {
				return '…';
			}
			return value;
		},
		2
	);

const JSONOutput = ({ results, count }) => {
	if (!results || !results.length) {
		return null;
	}

	const copyToClipboard = e => {
		if (has_async_clipboard) {
			navigator.clipboard.writeText(serialize(results));
		}
	};

	const [detailsOpen, setDetailsOpen] = useState(false);

	return (
		<div className="json-output">
			<h2>JSON output {count ? '(partial)' : ''}</h2>
			<p className="t--info">
				Some properties, such as <var>boundingBox</var> and <var>boundingPoly</var>, are
				omitted.
			</p>
			<details onToggle={e => setDetailsOpen(e.target.open)}>
				<summary>Click to expand JSON output</summary>
				<pre>{detailsOpen ? serialize(results) : ''}</pre>
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
