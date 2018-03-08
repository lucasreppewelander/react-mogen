const { readdirSync } = require('fs');

const findRoot = async (source, isRoot) => {
	const files = await readDirectory(source);

	for (let file of files) {
		if (acceptedRootFiles.indexOf(file) > -1) {
			isRoot = true;
		}
	}

	if (!isRoot) {
		source = source.split('/');
		source = source.slice(0, source.length - 1);
		source = source.join('/');
		return await findRoot(source);
	}

	return source;
};

const acceptedRootFiles = [
	'package.json',
	'.babelrc',
	'.babelrc.js',
	'.eslintrc',
	'.eslintrc.js',
	'.git'
];

const readDirectory = async (source) => {
	return await readdirSync(source);
};

module.exports = findRoot;