export default function compose(annotation) {
	return annotation.pages
		.map(page =>
			page.blocks
				.map(block =>
					block.paragraphs
						.map(para =>
							para.words
								.map(word =>
									word.symbols
										.map(s => {
											let ret = s.text;
											let bk = '';
											if (s.property && s.property.detectedBreak) {
												switch (s.property.detectedBreak.type) {
													case 'SPACE':
													case 'SURE_SPACE':
													case 'EOL_SURE_SPACE':
														bk = ' ';
														break;
													case 'LINE_BREAK':
													case 'HYPHEN':
														bk = '';
												}
												if (bk) {
													ret = s.property.detectedBreak.isPrefix
														? bk + ret
														: ret + bk;
												}
											}
											return ret;
										})
										.join('')
								)
								.join('')
						)
						.join('\n\n')
				)
				.join('\n\n')
		)
		.join('\n\n');
}
