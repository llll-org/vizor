import React from 'react';

import './ApiKey.css';

class ApiKey extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.removeKey = this.removeKey.bind(this);
		this.state = {
			key: ''
		};
	}

	handleSubmit(e) {
		this.props.onSetKey(this.state.key);
		e.preventDefault();
	}

	removeKey(e) {
		this.props.onRemoveKey();
		e.preventDefault();
	}

	handleChange(e) {
		this.setState({
			key: e.target.value.trim()
		});
	}

	render() {
		let { api_key } = this.props;
		return (
			<div className="apikey">
				{api_key ? (
					<React.Fragment>
						<p>
							<strong>Currently using this API key:</strong> <span>{api_key}</span> —{' '}
							<a href="#" onClick={this.removeKey}>
								Delete key
							</a>
						</p>
						<p>
							The Vision API is free up to 1000 requests, beyond which Google will
							start charging you. Keep an eye on your stats to avoid unforeseen costs.
						</p>
					</React.Fragment>
				) : (
					<React.Fragment>
						<h2>Google API Key</h2>
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
							to use Vizor.
						</p>
						<form onSubmit={this.handleSubmit}>
							<label>
								Enter Key:{' '}
								<input
									type="text"
									value={this.state.key}
									onChange={this.handleChange}
								/>
							</label>
							<button type="submit">OK</button>
							<p>
								<strong>Privacy:</strong> Your API key will be stored in your
								browser's local storage, for convenience. It will <em>not</em> be
								sent to any server, except API calls to Google.
							</p>
						</form>
					</React.Fragment>
				)}
			</div>
		);
	}
}

export default ApiKey;
