import React from 'react';

import './JSONOutput.css';

const JSONOutput = ({ json }) => (
	<div className="json-output">
		<pre>{JSON.stringify(json, null, 2)}</pre>
	</div>
);

export default JSONOutput;
