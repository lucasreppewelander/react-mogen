
const TestHelpers = {
	toThrow: (prop, component) => {
		return 'Warning: Failed propType: Required prop `' + prop + '` was not specified in `' + component +'`.';
	}
};

export default TestHelpers;