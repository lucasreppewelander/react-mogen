# react-mogen
> A CLI for generating React Components

[![Dependency Status][david-badge]][david-badge-url]
[![devDependency Status][david-dev-badge]][david-dev-badge-url]

[![npm](https://img.shields.io/npm/v/%40angular/cli.svg)][npm-badge-url]


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

## License
MIT
