const path = require('path');
const { promisify } = require('util');
const readFile = promisify(require('fs').readFile);
const writeFile = promisify(require('fs').writeFile);

const editPackageJson = async (framework, rootpath, optionsPath) => {
	if (framework === 'enzyme') {
		const pkgRaw = await readFile(path.join(rootpath, 'package.json'));
		const pkg = JSON.parse(pkgRaw);

		if (pkg.jest) {
			return false;
		}

		const pth = optionsPath[optionsPath.length - 1] !== '/' ? optionsPath + '/' : optionsPath;

		pkg['jest'] = {
			"setupFiles": [
				`<rootDir>/${pth}__setup__/enzyme-setup.js`
			],
			"testRegex": `${pth}(.*/__tests__/|__tests__/).*\\.jsx?$`
		};

		pkg['scripts']['test'] = 'jest';

		console.log(JSON.stringify(pkg, null, 4));
		await writeFile(
			path.join(rootpath, 'package.json'),
			JSON.stringify(pkg, null, 4)
		);

		return true;
	}

	return false;
}

module.exports = editPackageJson;