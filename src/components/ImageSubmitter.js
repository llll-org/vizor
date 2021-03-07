import React, { useEffect, useCallback } from 'react';

import './ImageSubmitter.css';

const ImageSubmitter = props => {
	useEffect(() => {
		const dragover = e => e.preventDefault();
		const drop = e => {
			e.preventDefault();
			props.process(e.dataTransfer.files);
		};

		document.addEventListener('dragover', dragover);
		document.addEventListener('drop', drop);
		return () => {
			document.removeEventListener('dragover', dragover);
			document.removeEventListener('drop', drop);
		};
	}, []);

	const handleSubmit = useCallback(e => {
		e.preventDefault();
		props.process(e.target.elements['images'].files);
	}, []);

	return (
		<div className="image-submitter">
			<h2>Select images</h2>
			<p>Choose images from your computer or drop them on the page.</p>
			<form onSubmit={handleSubmit}>
				<p>
					<input type="file" name="images" multiple />
				</p>
				<button type="submit">Process files</button>
			</form>
		</div>
	);
};

export default ImageSubmitter;
