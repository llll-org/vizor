import React from 'react';

import './JSONOutput.css';

const JSONOutput = ({ results }) => {
	if (!results || !results.length) {
		return null;
	}

	const abridge = (key, value) => {
		if (key === 'boundingPoly' || key === 'boundingBox') {
			return '…';
		}
		return value;
	};

	return (
		<div className="json-output">
			<h2>JSON output</h2>
			<p className="t--info">
				Some properties, such as <var>boundingBox</var> and <var>boundingPoly</var>, are
				omitted.
			</p>
			<details>
				<summary>Click to expand JSON output</summary>
				<pre>{JSON.stringify(results, abridge, 2)}</pre>
			</details>
		</div>
	);
};

export default JSONOutput;
