const { join } = require('path');
const { writeFileSync } = require('fs');
const findRoot = require('./assets/findRoot');

const Initialize = async (options) => {
	let isRoot = false;
	const rootPath = await findRoot(
		process.cwd(), isRoot);

	await writeFileSync(
		join(rootPath, '.mogenrc'),
		JSON.stringify(options, null, 4)
	);

	await console.log('Initialize successful');
};

module.exports = Initialize;