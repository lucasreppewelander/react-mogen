

const availableFrameworks = [
	'enzyme'
];

const testFramework = async (pkg) => {
	const devDeps = pkg.devDependencies;
	if (!devDeps) {
		return undefined;
	}

	for (let pakg in devDeps) {
		if (availableFrameworks.indexOf(pakg) > -1) {
			return pakg;
		}
	}
};

module.exports = testFramework;