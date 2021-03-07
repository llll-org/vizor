import tape from 'tape';
import compose from '../compose.js';

let fixture = require('./fixture.json');

tape('compose', t => {
	t.equal(compose(fixture.input), fixture.output);
	t.end();
});
