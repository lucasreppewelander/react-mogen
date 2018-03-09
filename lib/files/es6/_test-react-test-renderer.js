import ShallowRenderer from 'react-test-renderer/shallow';
import __tpl_name__ from './__tpl_name__';

const renderer = new ShallowRenderer();
renderer.render(<__tpl_name__ />);

const result = renderer.getRenderOutput();

expect(result.type).toBe('div');
expect(result.className).toEqual('__tpl_name__');