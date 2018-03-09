const colors = require('./assets/colors');
const mkdirp = require('mkdirp');
const findRoot = require('./assets/findRoot');
const testFramework = require('./assets/testFw');
const { join, dirname } = require('path');
const { readFileSync, writeFileSync } = require('fs');

const create = async (name, options) => {
	const rootPath = await findRoot(process.cwd(), false);
	const config = await readFileSync(join(rootPath, '.mogenrc'));
	const pkgRaw = await readFileSync(join(rootPath, 'package.json'));
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
	
	try {
		const testPath = join(componentPath, files[0]);

		for (let file of files) {
			const filepath = join(componentPath, file);
			await mkdirp(dirname(filepath));

			const content = await getFileContent(
				file, cfg, Object.assign({},
					options, {name: name}), pkg);
			await writeFileSync(filepath, content);
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
		content = await readFileSync(`${templateFilePath}/_style.js`, 'utf8');
	}
	
	if (filename.indexOf(`.${cfg.extensions}`) > -1) {
		content = await readFileSync(`${templateFilePath}/_component.js`, 'utf8');
	}

	if (filename.indexOf(`.test.js`) > -1) {
		const testFw = await testFramework(pkg);
		content = await readFileSync(`${templateFilePath}/_test-${testFw}.js`, 'utf8');
	}


	if (filename.indexOf(`.${cfg.extensions}`) > -1 && opts.stateless) {
		content = await readFileSync(`${templateFilePath}/_stateless-component.js`, 'utf8');
	}

	content = content.replace(/__tpl_name__/g, opts.name);
	content = content.replace(/__tpl_cfg_css__/g, cfg.css);

	return content;
};

module.exports = create;