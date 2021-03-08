import React, { useState, useCallback } from 'react';

import './ApiKey.css';

const ApiKey = props => {
	let [key, setKey] = useState('');

	let handleChange = useCallback(e => setKey(e.target.value.trim()), []);

	let handleSubmit = useCallback(
		e => {
			props.onSetKey(key);
			e.preventDefault();
		},
		[props.onSetKey, key]
	);

	let { api_key } = props;
	return (
		<div className="apikey">
			<h2>Google API Key</h2>
			{api_key ? (
				<React.Fragment>
					<div className="apikey__current">
						<span className="apikey__current-val">{api_key}</span>
						<button type="button" onClick={props.onRemoveKey}>
							Delete key
						</button>
					</div>

					<p className="info">
						The Vision API is free up to 1000 requests, beyond which Google will start{' '}
						<a href="https://cloud.google.com/vision/pricing">charging you</a>. Keep an
						eye on your usage statistics to avoid unforeseen costs!
					</p>
				</React.Fragment>
			) : (
				<React.Fragment>
					<p>
						You need to{' '}
						<a
							href="https://cloud.google.com/docs/authentication/api-keys"
							target="_blank"
							rel="noopener"
						>
							create an API key
						</a>{' '}
						and{' '}
						<a
							href="https://cloud.google.com/vision/docs/before-you-begin"
							target="_blank"
							rel="noopener"
						>
							enable the Google Vision API
						</a>{' '}
						to use Vizor. You also need to enable billing for the Google Vision API to
						work.
					</p>
					<form className="apikey__new" onSubmit={handleSubmit}>
						<label>
							Enter Key: <input type="text" value={key} onChange={handleChange} />
						</label>
						<button type="submit">Add key</button>
					</form>
					<p className="info">
						<strong>Privacy:</strong> Your API key will be stored in your browser's
						local storage, for convenience. It will <em>not</em> be sent to any server,
						except API calls to Google.
					</p>
				</React.Fragment>
			)}
		</div>
	);
};

ApiKey.defaultProps = {
	removeKey: () => {}
};

export default ApiKey;
