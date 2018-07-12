import React from 'react';
import { recognizeText } from '../api';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		const { files } = e.target;
		Promise.all(
			[...files].map(file => new Promise(resolve => {
				const reader = new FileReader();
				reader.addEventListener('load', () => resolve(btoa(reader.result))); 
				reader.readAsBinaryString(file);
			}).then(imageData => recognizeText(imageData)))
		).then(results => console.log(results)).catch(err => console.error(err));
	}

	render() {
		return (
			<div>
				<input type='file' onChange={this.handleChange}/>
			</div>
		)
	}
}

export default App;