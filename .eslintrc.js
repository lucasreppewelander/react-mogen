	module.exports = {
	"env": {
		"browser": true,
		"commonjs": true,
		"node": true,
		"es6": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended"
	],
	"parserOptions": {
		"sourceType": "module",
		"ecmaVersion": 2017
	},
	"rules": {
		"no-console": [0],
		"indent": ["error", "tab"],
		"linebreak-style": ["error", "unix"],
		"quotes": ["error", "single"],
		"semi": ["error", "always"],
		"comma-dangle": [2, "never"],
		"no-cond-assign": [2, "always"],
		"eqeqeq": [2, "smart"],
		"curly": "error",
		"dot-notation": "error",
		"no-else-return": ["error", { "allowElseIf": true }],
		"no-undef": ["error", { "typeof": false }],
		"no-unused-vars": "error"
	},
	"globals": {
		"abt": true,
		"it": true,
		"describe": true,
		"expect": true
	}
};