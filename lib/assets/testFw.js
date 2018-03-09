const colors = require('./colors');
const { promisify } = require('util');
const { prompt } = require('inquirer');
const questions = require('./test-questions');
const exec = promisify(require('child_process').exec);

const availableFrameworks = [
	'enzyme',
	'react-test-renderer'
];

const testFramework = async (pkg) => {
	const devDeps = pkg.devDependencies;
	const deps = pkg.dependencies;

	if (!devDeps && !deps) {
		return undefined;
	}

	for (let pakg in devDeps) {
		if (availableFrameworks.indexOf(pakg) > -1) {
			return pakg;
		}
	}
};

const installHelperPackages = async (framework, pkg) => {
	const devDeps = pkg.devDependencies;
	const deps = pkg.dependencies;
	const packages = [];
	
	for (let packag in devDeps) {
		if (packag === 'react') {
			await packages.push({ package: packag, version: getVersion(devDeps[packag]) });
		}
	}

	for (let packag in deps) {
		if (packag === 'react') {
			await packages.push({ package: packag, version: getVersion(deps[packag]) });
		}
	}


	for (let pk of packages) {
		if (pk.package === 'react') {
			await console.log(colors.ok(`npm install react-addons-test-utils@${pk.version} --save-dev`));
			await exec(`npm install react-addons-test-utils@${pk.version} --save-dev`, { stdio: [0,1,2] });
		}
	}

	const reactPackage = await packages.find(pk => {
		if (pk.package === 'react' && pk.version[0] === '0') {
			// return 14 instead of 0.14
			return 14;
		}

		return pk.version;
	});

	if (framework === 'enzyme') {
		await console.log(colors.ok(`npm install jest jsdom enzyme-adapter-react-${reactPackage.version === '0.14' ? '14' : reactPackage.version} --save-dev`));
		await exec(`npm install jest jsdom enzyme-adapter-react-${reactPackage.version === '0.14' ? '14' : reactPackage.version} --save-dev`, { stdio: [0,1,2] });
	}

	return reactPackage.version;
};

const getVersion = (semver) => {
	const raw = semver.split('.');
	return raw.slice(0, raw.length - 1).join('.').replace('^', '');
};

const promptInstall = async () => {
	return await prompt(questions).then(async answers => {

		if (availableFrameworks.indexOf(answers.framework) > -1) {
			await console.log(colors.ok(`npm install ${answers.framework} --save-dev`));
			await exec(`npm install ${answers.framework} --save-dev`, { stdio: [0,1,2] });
			return answers.framework;
		}

		return null;
	});
};

exports.testFramework = testFramework;
exports.promptInstall = promptInstall;
exports.installHelperPackages = installHelperPackages;
exports.getVersion = getVersion;