import React, { useState, useEffect, useCallback } from 'react';

import ApiKey from './ApiKey';
import ImageSubmitter from './ImageSubmitter';

const LS_KEY = 'vizor.google_api_key';

const App = props => {
	let [key, setKey] = useState(window.localStorage.getItem(LS_KEY));
	useEffect(() => {
		if (key) {
			window.localStorage.setItem(LS_KEY, key);
		} else {
			window.localStorage.removeItem(LS_KEY);
		}
	}, [key]);
	return (
		<div className="container">
			<ApiKey onSetKey={key => setKey(key)} onRemoveKey={() => setKey(null)} api_key={key} />
			{key && <ImageSubmitter api_key={key} />}
		</div>
	);
};

export default App;
