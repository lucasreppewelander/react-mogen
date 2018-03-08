#!/usr/bin/env node

// require colors setup
// const colors = require('./assets/colors');
const program = require('commander');
const { prompt } = require('inquirer');

const questions = require('./assets/init-questions');
const createComponent = require('./create');
const initConfig = require('./init');

program
	.version(require('../package.json').version)
	.arguments('<name>')
	.option('-s, --stateless', 'create a stateless functional component')
	.option('-n, --notests', 'do not generate a test file')
	.option('--init', 'generate config file')
	.on('--help', function() {
		console.log();
		console.log('  Examples:');
		console.log();
		console.log('    $ mogen Login');
		console.log('    $ mogen TextInput --stateless');
		console.log();
		console.log();
		console.log();
	})
	.parse(process.argv);

if (program.args.length) {
	createComponent(program.args[0], {
		stateless: program.stateless,
		no_tests: program.notests
	});
}

if (program.init) {
	prompt(questions).then(answers => initConfig(answers));
}