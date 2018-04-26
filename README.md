# react-mogen
> A CLI for generating React Components


### Prerequisites
the CLI requires (As of version 1.0.0) Node 7.6 as the CLI utilizes `async/await`.

## Installation

```bash
npm install -g react-mogen
```

Initialize and generate the .mogenrc config by calling the `--init` option

```bash
mogen --init

// which produces an .mogenrc like this
{
  "path": "src/components/",
  "es6": true,
  "css": "scss",
  "extensions": "js",
  "test": true
}
```

the config file can also be created manually by, in your root, create the file named `.mogenrc` with the following JSON

```bash
{
  "path": <string, path to your components folder>,
  "es6": <boolean, use es6 styled code or not>,
  "css": <string, css engine>,
  "extensions": <string, javascript extension>,
  "test": <boolean, wheter or not a test file should get generated>
}
```

## Usage

```bash
mogen --help

mogen <component name>
mogen LoginComponent
```

You can also create multiple components at the same time like this

```bash
mogen User Avatar
```

That line will create two components, one named User and one named Avatar

#### Generate a stateless component

```bash
mogen TextInput --stateless
```

#### Generate a component without a test

```bash
mogen Dropdown --notests
```

## Output
The complete output of each command will look like this:

```bash
Dropdown
  Dropdown.js
  Dropdown.css
  Dropdown.test.js
```

## Plugins
Specify plugins in the rc file like this:
```bash
  plugins: [
    'mogen-plugin-storybook'
  ]
```

the plugin needs to expose one function that is async either `async/await` or a promise. It expects to have a function called `run()` with the following arguments: name of the component, options which are the options where react-mogen got called with, example: `--stateless`,
config which is the config from the rc file, which holds your src path and etc. and last is the rootPath of your project from where react-mogen decides where to place components etc, often where the plugin finds either .mogenrc or package.json or similar.

## Changelog
### 2.0.0
- Added the ability to write plugins for react-mogen, see plugins section here above
- Added a new flag to mogenrc file where you can get an index.js created which exports the default from the component

- 1.2.0
- 1.1.0
- 1.0.0

## License
MIT
