# react-mogen
> A CLI for generating React Components

### Prerequisites
the CLI requires (As of version 1.0.0) Node 7.6 as the CLI utilizes `async/await`.

### Table of Contents
- Installation
- Usage
- License

## Installation
    npm install -g react-mogen

Initialize and generate the .mogenrc config by calling the `--init` option
    
    react-mogen --init


    // which produces an .mogenrc like this
    {
        "path": "src/components/",
        "es6": true,
        "css": "scss",
        "extensions": "js",
        "test": true
    }

the config file can also be created manually by, in your root, create the file named `.mogenrc` with the following JSON

    {
        "path": <string, path to your components folder>,
        "es6": <boolean, use es6 styled code or not>,
        "css": <string, css engine>,
        "extensions": <string, javascript extension>,
        "test": <boolean, wheter or not a test file should get generated>
    }

## Usage
    react-mogen --help
    
    react-mogen <component name>
    react-mogen LoginComponent

You can also create multiple components at the same time like this
    
    react-mogen User Avatar

That line will create two components, one named User and one named Avatar

#### Generate a stateless component
    react-mogen TextInput --stateless

#### Generate a component without a test
    react-mogen Dropdown --notests

## License
MIT
