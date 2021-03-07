import React from 'react';

import './TextOutput.css';

const TextOutput = ({ text }) => (
	<div className="text-output">
		<h2>Text output</h2>
		<textarea value={text} />
	</div>
);

export default TextOutput;
