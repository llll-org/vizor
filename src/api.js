import axios from 'axios';

const recognizeText = (key, imageData) =>
	axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${key}`, {
		requests: [
			{
				image: {
					content: imageData
				},
				features: [{ type: 'DOCUMENT_TEXT_DETECTION' }]
			}
		]
	});

export { recognizeText };
