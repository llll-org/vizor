const produceWord = (word, isProse) =>
	word.symbols
		.map(s => {
			let ret = s.text;
			let bk = '';
			if (s.property && s.property.detectedBreak) {
				switch (s.property.detectedBreak.type) {
					case 'SPACE':
					case 'SURE_SPACE':
						bk = ' ';
						break;
					case 'EOL_SURE_SPACE':
						bk = isProse ? ' ' : '\n';
						break;
					case 'LINE_BREAK':
						bk = isProse ? '' : '\n';
						break;
					case 'HYPHEN':
						bk = isProse ? '' : '-';
				}
				if (bk) {
					ret = s.property.detectedBreak.isPrefix ? bk + ret : ret + bk;
				}
			}
			return ret;
		})
		.join('');

export default function compose(annotation, isProse) {
	return annotation.pages
		.map(page =>
			page.blocks
				.map(block =>
					block.paragraphs
						.map(para => para.words.map(word => produceWord(word, isProse)).join(''))
						.join('\n\n')
				)
				.join('\n\n')
		)
		.join('\n\n');
}
