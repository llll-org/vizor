import axios from 'axios';

const recognizeText = (key, imageData) =>
	axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${config.key}`, {
		requests: [
			{
				image: {
					content: imageData
				},
				features: [{ type: 'TEXT_DETECTION' }]
			}
		]
	});

export { recognizeText };
