import React from 'react';

class ApiKey extends React.Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			key: ''
		}
	}

	handleSubmit(e) {
		this.props.onSetKey(this.state.key);
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
			<div>
				{
					api_key ?
						<div><strong>Using key:</strong> {api_key}</div>
						:
						<form onSubmit={this.handleSubmit}>
							<h2>Enter your Google API Key</h2>
							<label>
								<input type='text' value={this.state.key} onChange={this.handleChange}/>
							</label>
							<button type='submit'>OK</button>
						</form>
				}
			</div>
		);
	}
}

export default ApiKey;