import React from 'react';

import './TextOutput.css';

const TextOutput = ({ text }) => (
	<div className="text-output">
		<textarea value={text} />
	</div>
);

export default TextOutput;
