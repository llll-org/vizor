export default function getImageData(file) {
	return new Promise(resolve => {
		const reader = new FileReader();
		reader.addEventListener('load', () => resolve(btoa(reader.result)));
		reader.readAsBinaryString(file);
	});
}
