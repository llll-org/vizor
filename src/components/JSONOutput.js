import React from 'react';

import './JSONOutput.css';

const JSONOutput = ({ json }) => (
	<div className="json-output">
		<h2>JSON output</h2>
		<pre>{JSON.stringify(json, null, 2)}</pre>
	</div>
);

export default JSONOutput;
