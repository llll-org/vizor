import axios from 'axios';
import config from '../vizor.config.json';

let http = axios.create({
	baseURL: `https://vision.googleapis.com/v1/images:annotate?key=${config.key}`
});

const recognizeText = imageData => {
	http.post('', {
		requests: [
			{
				image: {
					content: imageData
				},
				features: [{ type: 'TEXT_DETECTION' }]
			}
		]
	});
}

export {
	recognizeText
}