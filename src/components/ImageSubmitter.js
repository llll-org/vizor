import React from 'react';

import { recognizeText } from '../api';

import JSONOutput from './JSONOutput';
import TextOutput from './TextOutput';

import './ImageSubmitter.css';

class ImageSubmitter extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			results: []
		};
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
			.then(results => {
				this.setState({ results: results.map(r => r.data) });
			})
			.catch(err => console.error(err));
	}

	render() {
		let { results } = this.state;

		return (
			<div className="image-submitter">
				<input type="file" onChange={this.handleChange} />

				{results &&
					results.length > 0 && (
						<TextOutput text={results[0].responses[0].fullTextAnnotation.text} />
					)}
			</div>
		);
	}
}

export default ImageSubmitter;
