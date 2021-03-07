import React from 'react';

import './TextOutput.css';

const TextOutput = ({ results }) => {
	if (!results || !results.length) {
		return null;
	}
	const text = results.map(r => r.responses[0].fullTextAnnotation.text).join('\n§§\n');
	return (
		<div className="text-output">
			<h2>Text output</h2>
			<p className="t--info">
				Pages are separated with the <strong>§§</strong> sequence of characters.
			</p>
			<textarea value={text} />
		</div>
	);
};

export default TextOutput;
