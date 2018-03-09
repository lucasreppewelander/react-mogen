const { join } = require('path');
const { promisify } = require('util');
const findRoot = require('./assets/findRoot');
const readFile = promisify(require('fs').readFile);
const writeFile = promisify(require('fs').writeFile);
const editPackageJson = require('./assets/editPackageJson');
const { createTestSetupFiles } = require('./assets/setupFiles');
const { testFramework, promptInstall, installHelperPackages } = require('./assets/testFw');

const Initialize = async (options) => {
	let isRoot = false;
	const rootPath = await findRoot(
		process.cwd(), isRoot);

	const pkgRaw = await readFile(join(rootPath, 'package.json'));
	const pkg = JSON.parse(pkgRaw);
	const gotTestFramework = await testFramework(pkg);

	let installed;
	if (!gotTestFramework) {
		installed = await promptInstall();
	}

	if (!!installed) {
		const version = await installHelperPackages(installed, pkg);
		installed === 'enzyme' ? await createTestSetupFiles(installed, join(rootPath, options.path, '__setup__'), version) : null;
		const hasBeenEdit = await editPackageJson(installed, rootPath, options.path);

		if (hasBeenEdit && installed === 'enzyme') {
			await console.log('Updated package.json with enzyme commands');
		}

		await console.log(`Sucessfully installed devDependencies`);
	}

	await writeFile(
		join(rootPath, '.mogenrc'),
		JSON.stringify(options, null, 4)
	);

	await console.log('Initialize successful');
};

module.exports = Initialize;