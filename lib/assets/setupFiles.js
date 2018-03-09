const path = require('path');
const { promisify } = require('util');
const findRoot = require('./findRoot');
const mkdirp = promisify(require('mkdirp'));
const readFile = promisify(require('fs').readFile);
const writeFile = promisify(require('fs').writeFile);

const createTestSetupFiles = async (framework, componentPath, version) => {
	const rootPath = await findRoot(__dirname, false);
	const setupFile = path.join(componentPath, `${framework}-setup.js`);
	const templateFilePath = path.join(rootPath, `lib/files/${framework}-files`);
	
	try {
		await mkdirp(path.dirname(setupFile));
	} catch(error) {
		console.log('couldnt create path at', path.dirname(setupFile));
	}

	let content = await readFile(`${templateFilePath}/_setup.js`, 'utf8');
	content = await content.replace(/__react_version__/g, version === '0.14' ? 14 : version);

	try {
		await writeFile(setupFile, content);
	} catch(error) {
		console.log('couldnt write file to', setupFile);
		console.log('why?', error);
	}
};

exports.createTestSetupFiles = createTestSetupFiles;