const { promisify } = require('util');
const { join, dirname } = require('path');
const colors = require('./assets/colors');
const mkdirp = promisify(require('mkdirp'));
const findRoot = require('./assets/findRoot');
const readFile = promisify(require('fs').readFile);
const writeFile = promisify(require('fs').writeFile);
const { testFramework } = require('./assets/testFw');
const exec = promisify(require('child_process').exec);

const create = async (name, options) => {
	const rootPath = await findRoot(process.cwd(), false);
	const config = await readFile(join(rootPath, '.mogenrc'));
	const pkgRaw = await readFile(join(rootPath, 'package.json'));
	const cfg = JSON.parse(config);
	const pkg = JSON.parse(pkgRaw);
	
	const componentPath = join(rootPath, cfg.path, `${name}/`);
	const files = [
		`${name}.${cfg.extensions}`,
		`${name}.${cfg.css}`
	];

	if (cfg.test && !options.no_tests) {
		files.push(`${name}.test.js`);
	}

	if (cfg.index) {
		files.push(`index.js`);
	}
	
	try {
		const testPath = join(componentPath, files[0]);

		for (let file of files) {
			const filepath = join(componentPath, file);
			await mkdirp(dirname(filepath));

			const content = await getFileContent(
				file, cfg, Object.assign({},
					options, {name: name}), pkg);
			await writeFile(filepath, content);
		}

		if (cfg.plugins && cfg.plugins.length) {
			for (let plugin of cfg.plugins) {
				if (plugin.indexOf('mogen-plugin') > -1) {
					const plug = require(plugin);
					const successful = await plug.run(
						name, options,
						cfg, rootPath
					);
				}
			}
		}

		await console.log(
			colors.help.bold(
				`Successfully created component at ${componentPath}`));
	} catch(error) {
		console.error(error);
	}
};

const getFileContent = async (filename, cfg, opts, pkg) => {
	const rootPath = await findRoot(__dirname, false);
	const templateFilePath = join(rootPath, `lib/files/${cfg.es6 ? 'es6' : 'es5'}`);
	let content;

	
	if (filename.indexOf(`.${cfg.css}`) > -1) {
		content = await readFile(`${templateFilePath}/_style.js`, 'utf8');
	}
	
	if (filename.indexOf(`.${cfg.extensions}`) > -1) {
		content = await readFile(`${templateFilePath}/_component.js`, 'utf8');
	}
	
	if (filename.indexOf(`.${cfg.extensions}`) > -1 && opts.stateless) {
		content = await readFile(`${templateFilePath}/_stateless-component.js`, 'utf8');
	}
	
	if (filename === 'index.js') {
		content = await readFile(`${templateFilePath}/_index.js`, 'utf8');
	}

	if (filename.indexOf(`.test.js`) > -1) {
		const testFw = await testFramework(pkg);
		content = await readFile(`${templateFilePath}/_test-${testFw}.js`, 'utf8');
	}

	content = content.replace(/__tpl_name__/g, opts.name);
	content = content.replace(/__tpl_cfg_css__/g, cfg.css);

	return content;
};

module.exports = create;