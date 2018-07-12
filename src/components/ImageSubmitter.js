import React from 'react';

import { recognizeText } from '../api';

import './ImageSubmitter.css';

class ImageSubmitter extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		const { files } = e.target;
		const { api_key } = this.props;
		Promise.all(
			[...files].map(file =>
				new Promise(resolve => {
					const reader = new FileReader();
					reader.addEventListener('load', () => resolve(btoa(reader.result)));
					reader.readAsBinaryString(file);
				}).then(imageData => recognizeText(api_key, imageData))
			)
		)
			.then(results => console.log(results))
			.catch(err => console.error(err));
	}

	render() {
		return (
			<div class="image-submitter">
				<input type="file" onChange={this.handleChange} />
			</div>
		);
	}
}

export default ImageSubmitter;
