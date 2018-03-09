module.exports = [
	{
		name: 'path',
		type: 'input',
		message: 'Enter where mogen should place your new components.'
	},
	{
		name: 'es6',
		type: 'confirm',
		message: 'Do you want to use ES6 syntax?'
	},
	{
		name: 'css',
		type: 'list',
		message: 'Specify css engine',
		choices: ['css', 'scss', 'sass']
	},
	{
		name: 'extensions',
		type: 'list',
		message: 'Specify javascript extension',
		choices: ['js', 'jsx']
	},
	{
		name: 'test',
		type: 'confirm',
		message: 'Should mogen create test files for your?'
	}
];