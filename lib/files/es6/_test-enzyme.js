import React from 'react';

import {shallow, mount} from 'enzyme';
// you should probably add
// globalHelpers like mocked functions etc.

import __tpl_name__ from './__tpl_name__';

describe('Testing __tpl_name__', () => {
	it('should render', () => {
		let component = shallow(<__tpl_name__ />);
		expect(component.find('.__tpl_name__')).toHaveLength(1);
	});
});