import React from 'react';

import ApiKey from './ApiKey';
import ImageSubmitter from './ImageSubmitter';

const LS_KEY = 'vizor.google_api_key';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.setKey = this.setKey.bind(this);
		this.removeKey = this.removeKey.bind(this);
		this.state = {
			key: window.localStorage.getItem(LS_KEY)
		};
	}

	setKey(key) {
		this.setState({ key }, () => {
			window.localStorage.setItem(LS_KEY, this.state.key);
		});
	}

	removeKey() {
		this.setState({ key: null }, () => {
			window.localStorage.removeItem(LS_KEY);
		});
	}

	render() {
		let { key } = this.state;
		return (
			<div className="container">
				<ApiKey onSetKey={this.setKey} onRemoveKey={this.removeKey} api_key={key} />
				{key && <ImageSubmitter api_key={key} />}
			</div>
		);
	}
}

export default App;
