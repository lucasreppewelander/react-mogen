import enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-__react_version__'
import jsdom from 'jsdom'

const setUpDomEnvironment = () => {
	const { JSDOM } = jsdom;
	const dom = new JSDOM('<!doctype html><html><body></body></html>', {url: 'http://localhost/'});
	const { window } = dom;

	global.window = window;
	global.document = window.document;
	global.navigator = {
		userAgent: 'node.js'
	};
	
	copyProps(window, global);
}

const copyProps = (src, target) => {
	const props = Object.getOwnPropertyNames(src)
		.filter(prop => typeof target[prop] === 'undefined')
		.map(prop => Object.getOwnPropertyDescriptor(src, prop));
	Object.defineProperties(target, props);
}

setUpDomEnvironment();
enzyme.configure({ adapter: new Adapter() });

console.warn = message => {
	throw message;
};

console.error = message => {
	throw new Error(message);
};