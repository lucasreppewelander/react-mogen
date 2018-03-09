import { getVersion } from '../lib/assets/testFw';

describe('test getVersion', () => {
	it('should parse semver', () => {
		var version = '^0.14.9';
		var output = getVersion(version);

		expect(output).toEqual('0.14');
	});
});