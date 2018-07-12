import React from 'react';

import ApiKey from './ApiKey';
import ImageSubmitter from './ImageSubmitter';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.setKey = this.setKey.bind(this);
		this.state = {
			key: window.localStorage.getItem('google_api_key')
		}
	}

	setKey(key) {
		this.setState({ key }, () => {
			window.localStorage.setItem('google_api_key', this.state.key);
		});
	}

	render() {
		let { key } = this.state;
		return (
			<div>
				<ApiKey onSetKey={this.setKey} api_key={key}/>
				{ key && <ImageSubmitter/> }
			</div>
		)
	}
}

export default App;