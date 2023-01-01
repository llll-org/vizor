const recognizeText = (key, imageData) =>
	fetch(`https://vision.googleapis.com/v1/images:annotate?key=${key}`, {
		method: 'POST',
		body: JSON.stringify({
			requests: [
				{
					image: {
						content: imageData
					},
					features: [{ type: 'DOCUMENT_TEXT_DETECTION' }]
				}
			]
		})
	});

export { recognizeText };
