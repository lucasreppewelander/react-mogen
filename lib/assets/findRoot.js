const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);

const findRoot = async (source, isRoot) => {
	const files = await readDirectory(source);

	for (let file of files) {
		if (acceptedRootFiles.indexOf(file) > -1) {
			isRoot = true;
		}
	}

	if (!isRoot) {
		const raw = source.split('/');
		return await findRoot(raw.slice(0, raw.length - 1).join('/'));
	}

	return source;
};

const acceptedRootFiles = [
	'package.json',
	'.babelrc',
	'.babelrc.js',
	'.git'
];

const readDirectory = async (source) => {
	try {
		return await readdir(source);
	} catch(error) {
		await console.error('readDirectory error', error);
	}
};

module.exports = findRoot;